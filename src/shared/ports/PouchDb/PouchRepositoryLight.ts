import { deepMerge } from './DeepMerge'
import { CouchDB } from './CouchDb'

export type Aggregate = {
  _id: string
}

/**
 * Comparison operators. These are used to compare a field with a value.
 */
export enum Operators {
  Equal = 'eq',
  GreaterThan = 'gt',
  GreaterThanOrEqual = 'gte',
  LessThan = 'lt',
  LessThanOrEqual = 'lte',
  Contains = 'contains',
  In = 'in',
}

/**
 * Logical operators. These are used to combine multiple predicates.
 */
export enum LogicalOperators {
  And = 'and',
  Or = 'or',
  Not = 'not',
}

type NestedKeyOf<ObjectType extends object> =
{[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
: `${Key}`
}[keyof ObjectType & (string | number)];

/**
 * Binding between Entity field and database column.
 */
export type Binding<TEntity extends Aggregate> =
  NestedKeyOf<TEntity> // todo: | ((x: TEntity) => void)

/**
 * A predicate is a comparison between a field and a value.
 */
export class Predicate<TEntity extends Aggregate> {
  constructor(
    public readonly field: Binding<TEntity>,
    public readonly operator: Operators,
    public readonly value: unknown,
  ) { }
}

/**
 *
 */
export class Expression<TEntity extends Aggregate> {
  public operator: LogicalOperators
  public query: Query<TEntity>[]

  constructor(
    operator: LogicalOperators,
    ...query: Query<TEntity>[]
  ) {
    this.operator = operator
    this.query = query
  }
}

export type Query<TEntity extends Aggregate> = Predicate<TEntity> | Expression<TEntity>


export class QueryBuilder<TEntity extends Aggregate> {

  /* -------------------------------------------------------------------------- */
  /*                            Comparison Operators                            */
  /* -------------------------------------------------------------------------- */

  op(field: Binding<TEntity>, operator: Operators, value: unknown): Query<TEntity> {
    return new Predicate<TEntity>(field, operator, value)
  }

  eq(field: Binding<TEntity>, value: unknown): Query<TEntity> {
    return this.op(field, Operators.Equal, value)
  }

  gte(field: Binding<TEntity>, value: unknown): Query<TEntity> {
    return this.op(field, Operators.GreaterThanOrEqual, value)
  }

  gt(field: Binding<TEntity>, value: unknown): Query<TEntity> {
    return this.op(field, Operators.GreaterThan, value)
  }

  lte(field: Binding<TEntity>, value: unknown): Query<TEntity> {
    return this.op(field, Operators.LessThanOrEqual, value)
  }

  lt(field: Binding<TEntity>, value: unknown): Query<TEntity> {
    return this.op(field, Operators.LessThan, value)
  }

  contains(field: Binding<TEntity>, value: unknown): Query<TEntity> {
    return this.op(field, Operators.Contains, value)
  }

  in(field: Binding<TEntity>, value: unknown[]): Query<TEntity> {
    return this.op(field, Operators.In, value)
  }

  /* -------------------------------------------------------------------------- */
  /*                              Logical Operators                             */
  /* -------------------------------------------------------------------------- */

  and(...query: Query<TEntity>[]): Query<TEntity> {
    return new Expression<TEntity>(LogicalOperators.And, ...query)
  }
  or(...query: Query<TEntity>[]): Query<TEntity> {
    return new Expression<TEntity>(LogicalOperators.Or, ...query)
  }
  not(...query: Query<TEntity>[]): Query<TEntity> {
    return new Expression<TEntity>(LogicalOperators.Not, ...query)
  }
}

export class PouchRepositoryLight<
  TAggregate extends Aggregate,
> {
  private _db: CouchDB
  private _collection: string
  private _conflictSolver: (a: TAggregate, b: TAggregate) => TAggregate = (_, b) => b

  constructor(
    db: CouchDB,
    collectionName: string,
    conflictSolver?: (a: TAggregate, b: TAggregate) => TAggregate
  ) {
    this._db = db
    this._collection = collectionName
    if (conflictSolver) {
      this._conflictSolver = conflictSolver
    }
  }

  async all(): Promise<TAggregate[]> {
    return await this.find(
      new QueryBuilder<TAggregate>()
        // @ts-ignore
        .eq('@type', this._collection)
    )
  }

  async save(
    entity: TAggregate
  ): Promise<void> {
    const toSave = { ...entity, '@type': this._collection }
    await this._db.db.upsert(
      toSave._id, (old: any) => this._conflictSolver(old, toSave)
    )
  }

  async get(
    id: TAggregate['_id']
  ): Promise<TAggregate> {
    return await this._db.db.get<TAggregate>(id)
  }

  async exists(
    id: TAggregate['_id']
  ): Promise<boolean> {
    const document = await this.get(id)
    return document !== undefined
  }

  async find(
    query: Query<TAggregate>,
  ): Promise<TAggregate[]> {
    const convertedQuery = {
      selector: {
        '$and': [
          { '@type': this._collection },
          ...[new QueryConverter().convert(query)],
        ]
      },
    }
    console.log('>>>> query', query, convertedQuery)
    const items = await this._db.db.find(convertedQuery)

    // @ts-ignore
    return items.docs
  }

  async delete(
    id: TAggregate['_id']
  ): Promise<void> {
    const doc = await this._db.db.get(id, { latest: true })
    await this._db.db.remove(doc)
  }
}

class QueryConverter {
  private operatorsMap: { [name: string]: string } = {
    [Operators.Equal]: '$eq',
    [Operators.GreaterThan]: '$gt',
    [Operators.GreaterThanOrEqual]: '$gte',
    [Operators.LessThan]: '$lt',
    [Operators.LessThanOrEqual]: '$lte',
    [Operators.In]: '$in',
    [Operators.Contains]: '$regex'
  }

  convert(query: Query<any>): any {
    return this._visit(query)
  }

  _visit(query: Query<any>): any {
    if (query instanceof Predicate) {
      if (query.operator === Operators.Equal && query.value === undefined) {
        return { [query.field]: { '$exists': false } }
      }

      // emulate contains with regex
      let value = this.getValue(query.value)
      if (query.operator === Operators.Contains) {
        // @ts-ignore
        value = new RegExp(value)
      }
      console.log('>>>> value', value, query.value, query.operator, query.field)

      // return query
      return {
        [query.field]: { [this.operatorsMap[query.operator]]: value }
      }
    } else if (query instanceof Expression) {
      if (query.operator === LogicalOperators.Or) {
        return { '$or': [...query.query.map(x => this._visit(x))] }
      }
      if (query.operator === LogicalOperators.Not) {
        return { '$not': deepMerge({}, ...query.query.map(x => this._visit(x))) }
      }
      if (query.operator === LogicalOperators.And) {
        return { '$and': [...query.query.map(x => this._visit(x))] }
      }

      return deepMerge(
        {},
        ...query.query.map(x => this._visit(x))
      )
    }
  }

  getValue(object: unknown) {
    if (object instanceof Date) {
      return object.getTime()
    }
    return object
  }
}
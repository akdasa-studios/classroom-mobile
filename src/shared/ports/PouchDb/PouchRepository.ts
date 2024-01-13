import { Aggregate, AnyIdentity, Identity } from '@framework/domain'
import { Expression, LogicalOperators, Operators, Predicate, Query, QueryBuilder, QueryOptions, Repository, ResultSet } from '@framework/persistence'

import { deepMerge } from './DeepMerge'
import { CouchDB } from './CouchDb'
import { DbScheme } from './DbScheme'

export type Mapper<TSource, TDestination> = (source: TSource) => TDestination


export class PouchRepository<
  TAggregate extends Aggregate<AnyIdentity>,
  TScheme extends DbScheme<unknown>,
> implements Repository<TAggregate> {
  private _db: CouchDB
  private _collection: string
  private _serializer: Mapper<TAggregate, TScheme>
  private _deserializer: Mapper<TScheme, TAggregate>
  private _conflictSolver: (a: TScheme, b: TScheme) => TScheme = (_, b) => b

  constructor(
    db: CouchDB,
    collectionName: string,
    serializer: Mapper<TAggregate, TScheme>,
    deserializer: Mapper<TScheme, TAggregate>,
    conflictSolver?: (a: TScheme, b: TScheme) => TScheme
  ) {
    this._db = db
    this._collection = collectionName
    this._serializer = serializer
    this._deserializer = deserializer
    if (conflictSolver) {
      this._conflictSolver = conflictSolver
    }
  }

  async all(): Promise<ResultSet<TAggregate>> {
    return await this.find(
      new QueryBuilder<TAggregate>()
        // @ts-ignore
        .eq('@type', this._collection)
    )
  }

  async save(
    entity: TAggregate
  ): Promise<void> {
    const document = this._serializer(entity)
    await this._db.db.upsert(
      entity.id.value, (old: any) => this._conflictSolver(old, document)
    )
  }

  async get(
    id: TAggregate['id']
  ): Promise<TAggregate> {
    const document = await this._db.db.get<TScheme>(id.value)
    return this._deserializer(document)
  }

  async exists(
    id: TAggregate['id']
  ): Promise<boolean> {
    const document = await this.get(id)
    return document !== undefined
  }

  async find(
    query: Query<TAggregate>,
    options?: QueryOptions
  ): Promise<ResultSet<TAggregate>> {
    const convertedQuery = {
      selector: {
        '$and': [
          { '@type': this._collection },
          ...[new QueryConverter().convert(query)],
        ]
      },
      limit: options?.limit,
      skip: options?.skip,
    }
    const items = await this._db.db.find(convertedQuery)

    return new ResultSet(
      items.docs.map((x: any) => this._deserializer(x)),
      { start: options?.skip || 0, count: items.docs.length }
    )
  }

  async delete(
    id: TAggregate['id']
  ): Promise<void> {
    const doc = await this._db.db.get(id.value, { latest: true })
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
        value = new RegExp(value)
      }

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
    if (object instanceof Identity) {
      return object.value
    } else if (object instanceof Array) {
      return object.map(x => x.value)
    } else if (object instanceof Date) {
      return object.getTime()
    }
    return object
  }
}
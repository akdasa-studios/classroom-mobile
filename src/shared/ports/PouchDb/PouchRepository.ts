import { Aggregate, AnyIdentity, Identity } from '@framework/domain'
import { Expression, LogicalOperators, Operators, Predicate, Query, QueryBuilder, QueryOptions, Repository, ResultSet } from '@framework/persistence'

import { ObjectMapper } from './ObjectMapper'
import { deepMerge } from './DeepMerge'
import { CouchDB } from './CouchDb'


export class PouchRepository<
  TAggregate extends Aggregate<AnyIdentity>
> implements Repository<TAggregate> {

  private _db: CouchDB
  private _collectionName: string
  private _serializer: ObjectMapper<TAggregate, unknown>
  private _deserializer: ObjectMapper<unknown, TAggregate>

  constructor(
    db: CouchDB,
    collectionName: string,
    serializer: ObjectMapper<TAggregate, unknown>,
    deserializer: ObjectMapper<unknown, TAggregate>
  ) {
    this._db = db
    this._collectionName = collectionName
    this._serializer = serializer
    this._deserializer = deserializer
  }

  async all(): Promise<ResultSet<TAggregate>> {
    return await this.find(
      new QueryBuilder<TAggregate>()
        // @ts-ignore
        .eq('@type', this._collectionName)
    )
  }

  async save(
    entity: TAggregate
  ): Promise<void> {
    console.debug(`[${this._collectionName}] save`, entity)
    const doc = this._serializer.map(entity)
    await this._db.db.upsert(
      entity.id.value,
      () => { return doc as any }
    )
  }

  async get(
    id: TAggregate['id']
  ): Promise<TAggregate> {
    console.debug(`[${this._collectionName}] get`, id)
    try {
      const document = await this._db.db.get(id.value)
      return this._deserializer.map(document)
    } catch {
      throw new Error('404')
    }
  }

  async exists(
    id: TAggregate['id']
  ): Promise<boolean> {
    console.debug(`[${this._collectionName}] exists`, id)
    const document = await this.get(id)
    return document !== undefined
  }

  async find(
    query: Query<TAggregate>,
    options?: QueryOptions
  ): Promise<ResultSet<TAggregate>> {
    console.debug(`[${this._collectionName}] find`, query)
    const convertedQuery = {
      selector: {
        '$and': [
          ...[new QueryConverter().convert(query)],
          { '@type': this._collectionName }
        ]
      },
      limit: options?.limit,
      skip: options?.skip,
    }
    const items = await this._db.db.find(convertedQuery)

    return new ResultSet(
      items.docs.map(x => this._deserializer.map(x)),
      { start: options?.skip || 0, count: items.docs.length }
    )
  }

  async delete(id: TAggregate['id']): Promise<void> {
    console.debug(`[${this._collectionName}] delete`, id)
    try {
      const doc = await this._db.db.get(id.value, { latest: true })
      await this._db.db.remove(doc)
    } catch (e) { console.log('CANT DELETE', e, this._collectionName) }
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
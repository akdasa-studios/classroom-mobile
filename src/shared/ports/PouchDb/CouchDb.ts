import PouchDB from 'pouchdb'
import PouchDBAdapterSqlLite from 'pouchdb-adapter-cordova-sqlite'
import PouchdbFind from 'pouchdb-find'
import PouchDBUpsert from 'pouchdb-upsert'

PouchDB.plugin(PouchDBUpsert)
PouchDB.plugin(PouchdbFind)
PouchDB.plugin(PouchDBAdapterSqlLite)


export interface CouchDBConfig {
  adapter?: string,
}

export class CouchDB {
  private _db: PouchDB.Database
  private _name: string

  constructor(
    name: string,
    config: CouchDBConfig
  ) {
    this._name = name
    this._db = new PouchDB(this._name, {
      revs_limit: 1,
      auto_compaction: true,
      ...config,
    })
  }

  get db(): PouchDB.Database {
    return this._db
  }
}

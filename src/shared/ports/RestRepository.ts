import { Aggregate, AnyIdentity } from '@framework/domain'
import { InMemoryRepository, Query, QueryOptions, Repository, ResultSet } from '@framework/persistence'
import { sleep } from '@protocol/core'

const RESPONSE_DELAY = 100

export class RestRepository<
  TAggregate extends Aggregate<AnyIdentity>
> implements Repository<TAggregate> {
  // TODO: for developing purposes only, implement
  //       real RestReposiotry later
  constructor(data: TAggregate[]) {
    for (const entity of data) { this.repo.save(entity) }
  }
  private repo = new InMemoryRepository<TAggregate>()

  async all(
    options?: QueryOptions | undefined
  ): Promise<ResultSet<TAggregate>> {
    await sleep(RESPONSE_DELAY)
    return await this.repo.all(options)
  }

  async save(
    entity: TAggregate
  ): Promise<void> {
    await sleep(RESPONSE_DELAY)
    throw this.repo.save(entity)
  }

  async get(
    id: TAggregate['id']
  ): Promise<TAggregate> {
    await sleep(RESPONSE_DELAY)
    return await this.repo.get(id)
  }

  async exists(
    id: TAggregate['id']
  ): Promise<boolean> {
    await sleep(RESPONSE_DELAY)
    return await this.repo.exists(id)
  }

  async find(
    query: Query<TAggregate>,
    options?: QueryOptions | undefined
  ): Promise<ResultSet<TAggregate>> {
    await sleep(RESPONSE_DELAY)
    return await this.repo.find(query, options)
  }

  async delete(
    id: TAggregate['id']
  ): Promise<void> {
    await sleep(RESPONSE_DELAY)
    return await this.repo.delete(id)
  }
}
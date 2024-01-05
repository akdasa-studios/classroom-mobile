import { Aggregate, AnyIdentity } from '@framework/domain'
import { InMemoryRepository, Query, QueryOptions, Repository, ResultSet } from '@framework/persistence'


export class CacheRepository<
  TAggregate extends Aggregate<AnyIdentity>
> implements Repository<TAggregate> {
  // TODO: for developing purposes only, implement
  //       real CacheRepository later
  private repo = new InMemoryRepository<TAggregate>()

  async all(
    options?: QueryOptions,
  ): Promise<ResultSet<TAggregate>> {
    return await this.repo.all(options)
  }

  async save(
    entity: TAggregate
  ): Promise<void> {
    return await this.repo.save(entity)
  }

  async get(
    id: TAggregate['id']
  ): Promise<TAggregate> {
    return await this.repo.get(id)
  }

  async exists(
    id: TAggregate['id']
  ): Promise<boolean> {
    return await this.repo.exists(id)
  }

  async find(
    query: Query<TAggregate>,
    options?: QueryOptions | undefined
  ): Promise<ResultSet<TAggregate>> {
    return await this.repo.find(query, options)
  }

  async delete(
    id: TAggregate['id']
  ): Promise<void> {
    return await this.repo.delete(id)
  }

}
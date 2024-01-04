import { Aggregate, AnyIdentity } from '@framework/domain'
import { Query, QueryOptions, Repository, ResultSet } from '@framework/persistence'


export class OfflineRepository<
  TAggregate extends Aggregate<AnyIdentity>
> implements Repository<TAggregate> {
  constructor(
    private readonly onlineRepository: Repository<TAggregate>,
    private readonly offlineRepository: Repository<TAggregate>,
    public online: boolean = true
  ) {

  }

  async all(
    options?: QueryOptions | undefined
  ): Promise<ResultSet<TAggregate>> {
    if (this.online) {
      const result = await this.onlineRepository.all(options)
      for (const entity of result.entities) {
        this.offlineRepository.save(entity)
      }
      return result
    } else {
      return await this.offlineRepository.all(options)
    }
  }

  async save(
    entity: TAggregate
  ): Promise<void> {
    if (!this.online) {
      throw new Error('Repository offline')
    }
    throw this.onlineRepository.save(entity)
  }

  async get(
    id: TAggregate['id']
  ): Promise<TAggregate> {
    if (this.online) {
      const result = await this.onlineRepository.get(id)
      this.offlineRepository.save(result)
      return result
    } else {
      return await this.offlineRepository.get(id)
    }
  }

  async exists(
    id: TAggregate['id']
  ): Promise<boolean> {
    if (this.online) {
      return await this.onlineRepository.exists(id)
    } else {
      return await this.offlineRepository.exists(id)
    }
  }

  async find(
    query: Query<TAggregate>,
    options?: QueryOptions | undefined
  ): Promise<ResultSet<TAggregate>> {
    if (this.online) {
      const result = await this.onlineRepository.find(query, options)
      for (const entity of result.entities) {
        this.offlineRepository.save(entity)
      }
      return result
    } else {
      return await this.offlineRepository.find(query, options)
    }
  }

  async delete(
    id: TAggregate['id']
  ): Promise<void> {
    if (!this.online) {
      throw new Error('Repository offline')
    }
    return await this.onlineRepository.delete(id)
  }
}
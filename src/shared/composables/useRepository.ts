import { CacheRepository, OfflineRepository, RestRepository } from '@/shared'
import { Network } from '@capacitor/network'
import { Aggregate, AnyIdentity } from '@framework/domain'
import { Repository } from '@framework/persistence'
import { ref } from 'vue'


export function useRepository<
  TAggregate extends Aggregate<AnyIdentity>
>(
  name: string,
  entities: TAggregate[] // TODO: for development purposes only
): Repository<TAggregate> {

  /* -------------------------------------------------------------------------- */
  /*                                    Setup                                   */
  /* -------------------------------------------------------------------------- */

  const repo = REPOSITORIES.get(name)
  if (repo) { return repo as Repository<TAggregate> }

  const repository = new OfflineRepository<TAggregate>(
    new RestRepository<TAggregate>(entities),
    new CacheRepository<TAggregate>(),
    IS_ONLINE.value
  )

  REPOSITORIES.set(
    name, repository as OfflineRepository<Aggregate<AnyIdentity>>)

  return repository
}

/* -------------------------------------------------------------------------- */
/*                                Global State                                */
/* -------------------------------------------------------------------------- */

const REPOSITORIES = new Map<string, OfflineRepository<any>>()
const IS_ONLINE    = ref(true)

Network.addListener('networkStatusChange', status => {
  IS_ONLINE.value = status.connected
  REPOSITORIES.forEach(x => x.online = IS_ONLINE.value)
})

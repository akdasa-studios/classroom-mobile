import { ref } from 'vue'
import { SyncWithRemoteServer, UploadToRemoteServer } from '../tasks/SyncTask'

/* -------------------------------------------------------------------------- */
/*                                Global State                                */
/* -------------------------------------------------------------------------- */

const busy = ref(false)
const completedAt = ref(0)
const direction = ref<'upload'|'download'>('upload')

/* -------------------------------------------------------------------------- */
/*                                 Composable                                 */
/* -------------------------------------------------------------------------- */

export function useSyncTask() {
  async function start() {
    busy.value = true
    direction.value = 'upload'
    await UploadToRemoteServer()
    direction.value = 'download'
    await SyncWithRemoteServer()
    busy.value = false
    completedAt.value = Date.now()
  }

  return { start, busy, completedAt, direction }
}

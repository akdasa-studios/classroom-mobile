import { ref } from 'vue'
import { SyncWithRemoteServer } from '../tasks/SyncTask'

const busy = ref(false)
const completedAt = ref(0)

export function useSyncTask() {
  async function start() {
    busy.value = true
    await SyncWithRemoteServer()
    busy.value = false
    completedAt.value = Date.now()
  }

  return { start, busy, completedAt }
}

window.sync = useSyncTask()
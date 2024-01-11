import { ref } from 'vue'
import { DownloadTask, DownloaderService } from '../services/DownloaderService'

/**
 * Downloads and caches a file on the device.
 */
export function useDownloaderQueue() {

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  function addToQueue(
    url: string,
    title?: string
  ) {
    queue.value.push({ url, title })
  }

  async function downloadAll() {
    try {
      isDownloading.value = true
      while (queue.value.length !== 0) {
        const task = queue.value.pop()
        if (!task) { return }
        await downloader.download({ url: task.url, title: task.title })
      }
    } finally {
      isDownloading.value = false
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { addToQueue, isDownloading, downloadAll, queue }
}

/* -------------------------------------------------------------------------- */
/*                            Global Dependencies                             */
/* -------------------------------------------------------------------------- */

const downloader = new DownloaderService()


/* -------------------------------------------------------------------------- */
/*                                Global State                                */
/* -------------------------------------------------------------------------- */

const isDownloading = ref(false)
const queue = ref<DownloadTask[]>([])


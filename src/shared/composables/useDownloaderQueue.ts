import { ref } from 'vue'
import { DownloaderService } from '../services/DownloaderService'

/**
 * Downloads and caches a file on the device.
 */
export function useDownloaderQueue() {

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  function addToQueue(
    url: string
  ) {
    queue.value.push(url)
  }

  async function downloadAll() {
    try {
      isDownloading.value = true
      while (queue.value.length !== 0) {
        const url = queue.value.pop()
        if (!url) { return }
        await downloader.download({ url })
      }
    } finally {
      isDownloading.value = false
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { addToQueue, isDownloading, downloadAll }
}

/* -------------------------------------------------------------------------- */
/*                            Global Dependencies                             */
/* -------------------------------------------------------------------------- */

const downloader = new DownloaderService()


/* -------------------------------------------------------------------------- */
/*                                Global State                                */
/* -------------------------------------------------------------------------- */

const isDownloading = ref(false)
const queue = ref<string[]>([])


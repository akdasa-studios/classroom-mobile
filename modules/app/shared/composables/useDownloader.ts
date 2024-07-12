import { ref } from 'vue'
import { DownloaderService } from '../services/DownloaderService'

/**
 * Downloads and caches a file on the device.
 */
export function useDownloader() {

  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const downloader = new DownloaderService()


  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const isDownloading = ref(false)


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function download(
    url: string
  ) {
    isDownloading.value = true
    try {
      const result = await downloader.download({ url })
    return result
    } catch {
      // do nothing
    } finally {
      isDownloading.value = false
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { download, isDownloading }
}

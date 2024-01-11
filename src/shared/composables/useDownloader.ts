import { Capacitor } from '@capacitor/core'
import { Directory, Filesystem } from '@capacitor/filesystem'
import { ref } from 'vue'

/**
 * Downloads and caches a file on the device.
 */
export function useDownloader() {
  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const isDownloading = ref(false)

  /**
   * Download a file from a URL and return device-specific URI
   * what can be used later.
   * @param url Url of the file to download.
   * @returns The URI of the downloaded file.
   */
  async function download(
    url: string,
    path?: string
  ): Promise<string> {
    // We don't need to download the file if we're on the web
    // because we can just use the URL directly.
    if (Capacitor.getPlatform() === 'web') { return url }

    // Check if the file already downloaded
    const pathName = new URL(url).pathname.split('/')
    const fileName = pathName.pop()!
    const filePath = path ? `${path}/${fileName}` : fileName
    try {
      const stat = await Filesystem.stat({
        path: `${filePath}`, directory: Directory.Data
      })
      return Capacitor.convertFileSrc(stat.uri)
    } catch (e) {
      // File not found, continue to download
    }

    // We need to download the file if we're on a mobile device
    try {
      isDownloading.value = true
      console.log('!!!!', filePath)
      console.log('!!!', url)
      const res = await Filesystem.downloadFile({
        url: url,
        directory: Directory.Data,
        path: filePath,
        recursive: true
      })
      console.log('===', res)

      if (!res.path) {
        throw 'Unable to download file'
      }

      return Capacitor.convertFileSrc(res.path)
    } finally {
      isDownloading.value = false
    }
  }

  /**
   * Check if a file is already being downloaded.
   * @param url Url to check
   * @returns If a file is already being downloaded, return true, otherwise false.
   */
  async function isDownloaded(
    url: string
  ): Promise<boolean> {
    const pathName = new URL(url).pathname.split('/')
    const fileName = pathName.pop()
    const filePath = pathName.join('/') + '/' + fileName
    try {
      await Filesystem.stat({
        path: `${filePath}`, directory: Directory.Data
      })
      return true
    } catch (e) {
      return false
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { download, isDownloading, isDownloaded }
}
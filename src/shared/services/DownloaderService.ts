import { Capacitor } from '@capacitor/core'
import { Directory, Filesystem } from '@capacitor/filesystem'

export interface DownloadTask {
  url: string,
  folder?: string
  title?: string
}

export class DownloaderService {

  async download(
    task: DownloadTask
  ): Promise<string> {
    if (Capacitor.getPlatform() === 'web') {
      return task.url
    }

    const pathName = new URL(task.url).pathname.split('/')
    const fileName  = pathName.pop()!
    const filePath  = task.folder ? `${task.folder}/${fileName}` : fileName

    try {
      const stat = await Filesystem.stat({
        path: filePath, directory: Directory.Data
      })
      return Capacitor.convertFileSrc(stat.uri)
    } catch (e) {
      // File not found, continue to download
    }

    console.log('Downloading: ', task.url)

    const result = await Filesystem.downloadFile({
      webFetchExtra: {
        mode: 'no-cors',
      },
      url: task.url,
      directory: Directory.Data,
      path: filePath,
      recursive: true
    })

    if (!result.path) {
      throw 'Unable to download file'
    }

    return Capacitor.convertFileSrc(result.path)
  }
}

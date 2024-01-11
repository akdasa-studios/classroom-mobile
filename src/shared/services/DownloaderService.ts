import { Directory, Filesystem } from '@capacitor/filesystem'

interface DownloadTask {
  url: string,
  folder?: string
}

export class DownloaderService {
  private queue: DownloadTask[] = []

  constructor() {
  }

  addToQueue(
    task: DownloadTask
  ) {
    this.queue.push(task)
    if (this.queue.length === 1) { this.loop() }
  }

  private async loop() {
    while (this.queue.length > 0) {
      const task = this.queue.pop()
      if (!task) { return }

      const pathName = new URL(task.url).pathname.split('/')
      const fileName = pathName.pop()!
      const filePath = task.folder ? `${task.folder}/${fileName}` : fileName

      try {
        await Filesystem.stat({
          path: filePath, directory: Directory.Data
        })
        continue // file is already downloaded
      } catch (e) {
        // File not found, continue to download
      }

      console.log('Downloading: ', task.url)

      await Filesystem.downloadFile({
        webFetchExtra: {
          mode: 'no-cors',
        },
        url: task.url,
        directory: Directory.Data,
        path: filePath,
        recursive: true
      })
    }
  }
}

export const Downloader = new DownloaderService()
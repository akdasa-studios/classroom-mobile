import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.akdasa.classroom',
  appName: 'Classroom',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
}

export default config

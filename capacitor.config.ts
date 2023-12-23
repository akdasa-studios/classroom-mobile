import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.akdasa.bcs-school-of-devotion',
  appName: 'BCS School of Devotion',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

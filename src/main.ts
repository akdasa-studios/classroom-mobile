import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { IonicVue } from '@ionic/vue'
import { fluent } from './i18n'


/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/* Theme variables */
import './theme.css'
import './lottie.css'

import { runConfigPersistence } from './shared'


async function createAndRunApp() {
  await runConfigPersistence()

  const app = createApp(App)
    .use(IonicVue)
    .use(router)
    .use(fluent)

  router.isReady().then(async () => {
    app.mount('#app')
  })
}

createAndRunApp()
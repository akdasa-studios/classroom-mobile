import { FluentBundle } from '@fluent/bundle'
import { createFluentVue } from 'fluent-vue'

import authResources from './auth/i18n'
import educationResources from './education/i18n'
import sharedResources from './shared/i18n'

export const enBundle = new FluentBundle('en')
export const ruBundle = new FluentBundle('ru')

// ru:
authResources.ru.forEach(x => ruBundle.addResource(x))
educationResources.ru.forEach(x => ruBundle.addResource(x))
sharedResources.ru.forEach(x => ruBundle.addResource(x))

// en:
authResources.en.forEach(x => enBundle.addResource(x))
sharedResources.en.forEach(x => enBundle.addResource(x))


export const fluent = createFluentVue({
  bundles: [ruBundle]
})

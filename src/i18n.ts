import { FluentBundle } from '@fluent/bundle'
import { createFluentVue } from 'fluent-vue'

import authResources from './auth/i18n'

export const enBundle = new FluentBundle('en')
export const ruBundle = new FluentBundle('ru')

authResources.ru.forEach(x => ruBundle.addResource(x))

export const fluent = createFluentVue({
  bundles: [ruBundle]
})

import { FluentResource } from '@fluent/bundle'

import ruMessages from './i18n/ru.ftl?raw'
import enMessages from './i18n/en.ftl?raw'

export default {
  ru: [
    new FluentResource(ruMessages)
  ],
  en: [
    new FluentResource(enMessages)
  ]
}

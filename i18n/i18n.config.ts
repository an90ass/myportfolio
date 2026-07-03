import en from './en.json'
import ar from './ar.json'
import tr from './tr.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  missingWarn: false,
  fallbackWarn: false,
  messages: {
    en,
    ar,
    tr,
  },
}))

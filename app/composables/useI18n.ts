import de from '~/locales/de.json'
import en from '~/locales/en.json'
import nl from '~/locales/nl.json'

const messages = { de, en, nl } as const
type Locale = keyof typeof messages

export function useI18n() {
  const locale = useState<Locale>('locale', () => 'de')

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = messages[locale.value]
    for (const k of keys) {
      value = value?.[k]
    }
    return typeof value === 'string' ? value : key
  }

  const setLocale = (l: Locale) => {
    locale.value = l
    if (process.client) {
      localStorage.setItem('so-locale', l)
    }
  }

  const initLocale = () => {
    if (process.client) {
      const saved = localStorage.getItem('so-locale')
      if (saved && saved in messages) {
        locale.value = saved as Locale
      }
    }
  }

  return {
    locale: readonly(locale),
    locales: Object.keys(messages) as Locale[],
    t,
    setLocale,
    initLocale
  }
}

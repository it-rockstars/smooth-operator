import en from '~/locales/en.json'

const messages = { en } as const
type Locale = keyof typeof messages

export function useI18n() {
  const locale = useState<Locale>('locale', () => 'en')

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
  }

  const initLocale = () => {
    // English-only for now
  }

  return {
    locale: readonly(locale),
    locales: Object.keys(messages) as Locale[],
    t,
    setLocale,
    initLocale
  }
}

import { useEffect, useState, useCallback } from 'react'
import { EN } from './translations'
import { LanguageContext } from './context'

const STORAGE_KEY = 'futura-lang'

/* French is the default language. When lang === 'fr', t() returns the source
   French string unchanged. When lang === 'en', t() looks the string up in the
   EN dictionary (keyed by the French source) and falls back to the French
   string if no translation exists.

   The context object and the useLang hook live in ./context so this file only
   exports a component (required by React Fast Refresh). */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'fr'
    return window.localStorage.getItem(STORAGE_KEY) || 'fr'
  })

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, lang) } catch { /* ignore */ }
    if (typeof document !== 'undefined') document.documentElement.lang = lang
  }, [lang])

  const toggle = useCallback(() => {
    setLang(l => (l === 'fr' ? 'en' : 'fr'))
  }, [])

  const t = useCallback(
    (fr) => {
      if (lang === 'fr') return fr
      return EN[fr] ?? fr
    },
    [lang],
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

import { createContext, useContext } from 'react'

/* The bare context lives here (not in the provider file) so the provider file
   only exports a component — keeps React Fast Refresh happy. */
export const LanguageContext = createContext(null)

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}

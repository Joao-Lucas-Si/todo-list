import { useContext, useMemo } from "react"
import { Portuguese } from "../i18n/portuguese"
import LanguageContext from "./LanguageContext"
import { useStorage } from "./storage"

export default () => {
  const languages = useContext(LanguageContext)
  const [language] = useStorage("language", "portuguese")
  const messages = useMemo(() => languages[language] ?? Portuguese, [language, languages])
  return messages
}
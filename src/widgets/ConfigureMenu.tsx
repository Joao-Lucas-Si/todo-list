import { useMemo } from "react"
import { useStorage } from "../hooks/storage"
import useLanguages from "../hooks/useLanguages"
import CheckBox from "./CheckBox"

export default () => {
  const messages = useLanguages()
  const [theme, setTheme] = useStorage("theme", "light")
  const [currentLanguage, setLanguage] = useStorage("language", "portuguese")
  const languages = useMemo(() => [
    {
      value: "portuguese",
      name: messages.portuguese
    },
    {
      value: "english",
      name: messages.english
    },
    {
      value: "korean",
      name: messages.korean
    }
  ], [messages])
  return <div className="p-4 flex md:flex-row flex-col justify-between gap-4">
    <div className="flex gap-4 justify-center">
      <label htmlFor="languages-select">{messages.language}</label>
      <select id="languages-select" className="bg-transparent border-2 border-primary rounded" value={currentLanguage} onChange={(e) => setLanguage(e.target.value)}>
        {languages.map(language => <option
          className="dark:bg-dark"
          key={language.value}
          value={language.value}>{language.name}</option>)}
      </select>
    </div>
    <div className="flex justify-center gap-4">
      <label>{messages.theme}</label>
      <CheckBox isCheck={theme === "dark"} setIsCheck={(isCheck) => setTheme(isCheck ? "dark" : "light")} />
      <label>{theme === "dark" ? messages.themes.dark : messages.themes.light}</label>
    </div>
    
  </div>
}
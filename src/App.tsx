import "./App.css";
import Task from "./widgets/Task";
import { useStorage, Provider as StorageProvider } from "./hooks/storage";
import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import { Helmet } from "react-helmet-async"
import TaskList from "./TaskList";
import { Portuguese } from "./i18n/portuguese";
import { English } from "./i18n/english";
import { Korean } from "./i18n/korean";
import useLanguages from "./hooks/useLanguages";
import ConfigureMenu from "./widgets/ConfigureMenu";

export default function App() {
  const [showForm, setShowForm] = useState(false)
  const [theme] = useStorage("theme", "dark")
  const [language, setLanguage, languageExists] = useStorage("language", "portuguese")

  const messages = {
    portuguese: {
      messages: Portuguese,
      codes: ["pt-br"]
    },
    english: {
      messages: English,
      codes: ["en"]
    },
    korean: {
      messages: Korean,
      codes: ["kr"]
    }
  }

  useEffect(() => {

    if (!languageExists) {
      const browserLanguage = Object.entries(messages).find(entry => entry[1].codes.includes(navigator.language.toLowerCase()));
      console.log(browserLanguage)
      if (browserLanguage) setLanguage(browserLanguage[0])

    }
  }, [])

  const message = useLanguages()

  return (
    <div className={`app bg-light dark:bg-dark dark:text-light`}>
      <Helmet htmlAttributes={{ lang: messages[language].codes[0], class: theme }}>
        <title>{message.todoList}</title>
      </Helmet>
      <div className=" h-[100vh] flex flex-col gap-4 justify-center items-center">
        <h1 className="text-4xl">{message.todoList}</h1>
        <div className="w-[95vw] md:w-[50vw] border-4 rounded-lg border-primary md:h-[70vh] h-[85vh] overflow-y-auto overflow-x-hidden " >
          <ConfigureMenu />
          {showForm
            ? <TaskForm setShowForm={setShowForm} />
            : <TaskList setShowForm={setShowForm} />
          }
        </div>
      </div>
    </div>
  );
}

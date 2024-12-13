import Task from "./widgets/Task";
import { useStorage } from "./hooks/storage";
import { useEffect, useState } from "react";
import TextField from "./widgets/TextField";
import useLanguages from "./hooks/useLanguages";
import { createSwapy } from "swapy";

export default (props: { setShowForm: (showForm: boolean) => void }) => {
  const [task, setTask] = useStorage("task", undefined);
  const [title, setTitle] = useState(task?.title ?? "")
  const [priority, setPriority] = useState(task?.priority ?? 0)
  const [description, setDescription] = useState(task?.description ?? "")
  const [tasks, setTasks] = useStorage("tasks", [])
  const messages = useLanguages()

  useEffect(() => {
    if (task) {
      console.log(task)
      setTitle(task.title)
      setPriority(task.priority)
      setDescription(task.description ?? "")
    }
  }, [task])


  const fields: Parameters<typeof TextField>["0"][] = [
    {
      id: "title",
      label: messages.title,
      setValue: setTitle,
      defaultValue: title
    },
    {
      id: "priority",
      label: messages.priority,
      setValue: setPriority,
      defaultValue: priority
    },
    {
      id: "description",
      label: messages.description,
      setValue: setDescription,
      defaultValue: description,
      isMultiLine: true
    }
  ]

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      if (task) setTasks(tasks.map(ta => ta.title === task.title ? { ...ta, title, priority, description } : ta))
      else setTasks([
          ...tasks, 
          {
            priority,
            title,
            isDone: false,
            description
          }
        ])
      setTask(undefined)
      props.setShowForm(false)
    }}>
      <header className="flex justify-between px-4 py-2 border-b-4 border-primary">
        <button type="button" onClick={() => {
          props.setShowForm(false)
          setTask(undefined)
        }}>{messages.cancel}</button>
        <h1>{messages.addTask}</h1>
        <button type="submit">{messages.add}</button>
      </header>
      <div className="flex flex-col h-[100%] gap-4 p-4 justify-center items-center">
        {fields.map(field => <TextField key={field.id} {...field} />)}
      </div>
    </form>
  )
}
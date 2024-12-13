import { useState } from "react";
import { useStorage } from "../hooks/storage";
import useLanguages from "../hooks/useLanguages";
import { TaskType } from "../types/TaskType";
import CheckBox from "./CheckBox";

export default (props: TaskType & { setShowForm: (showForm: boolean) => void }) => {
  const messages = useLanguages()
  const [showDetails, setShowDetails] = useState(false)
  const [_, setTask] = useStorage("task", undefined)
  const [tasks, setTasks] = useStorage("tasks", [])
  return (
    <div data-swapy-slot={props.title}>
      <div data-swapy-item={props.title} className="flex flex-col data-[data-swapy-highlighted]:border-4 justify-between border-b-4 border-primary" >
        <div className="flex md:flex-row w-[100%] flex-col p-4 justify-between ">
          <div className="flex gap-4 items-center">
            <CheckBox isCheck={props.isDone} setIsCheck={(isCheck) => { setTasks(tasks.map(task => task.title === props.title ? { ...task, isDone: isCheck } : task)) }} />
            <h2>{props.title}</h2>
          </div>
          <button onClick={() => setShowDetails
            (!showDetails)}>{messages.details}</button>
          <div className="flex gap-4 ">
            <button
              onClick={() => {
                const currentTask = tasks.find(task => task.title === props.title)
                console.log(currentTask)
                setTask(currentTask)
                props.setShowForm(true)
              }}
              className="bg-positive rounded-lg p-2"
            >{messages.edit}</button>
            <button
              onClick={() => setTasks(tasks.filter(task => task.title !== props.title))}
              className="bg-negative rounded-lg p-2"
            >{messages.delete}</button>
          </div>
        </div>
        {showDetails && <div className={`overflow-hidden origin-top transition `}>
          <p className="break-words px-4 pb-2">{props.description}</p>
        </div>}
        {/* <div data-swapy-handle>mover</div> */}
      </div>
    </div>
  )
}
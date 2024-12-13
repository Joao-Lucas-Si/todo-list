import Task from "./widgets/Task";
import { useStorage } from "./hooks/storage";
import TextField from "./widgets/TextField";
import useLanguages from "./hooks/useLanguages";
import { useEffect, useState } from "react";
import { createSwapy } from "swapy";

export default (props: { setShowForm: (show: boolean) => void }) => {
  const messages = useLanguages()
  const [tasks] = useStorage("tasks", [])
  const [search, setSearch] = useState("")

  // useEffect(() => {
  //   const container1 = document.querySelector('.container-1')
  //   const container2 = document.querySelector('.container-2')
  //   if (container1 ) {
  //     const swapy = createSwapy(container1, {
  //       animation: 'dynamic' // or spring or none
  //     })

  //     // You can disable and enable it anytime you want
  //     swapy.enable(true)
  //   }
  // }, [])

  return (
    <>
      <div className="flex gap-2 md:gap-8 flex-col md:flex-row justify-center items-center p-2 border-b-4 border-primary ">
        <TextField id="search" label={messages.search} setValue={setSearch} />
        {/* <h1>{messages.tasks}</h1> */}
        <button onClick={() => props.setShowForm(true)}>{messages.add}</button>
      </div>
      <div>
        <div className="overflow-none container-1">
          <h3 className="border-b-4 border-primary text-center text-xl" >{messages.notDone}</h3>
          {
            tasks
              .filter(task => task.title.includes(search) && !task.isDone)
              .length === 0
              ? <h4 className="text-center">{messages.notFound}</h4>
              : tasks
                .filter(task => task.title.includes(search) && !task.isDone)
                .sort((e1, e2) => e2.priority - e1.priority)
                .map(task =>
                  <Task setShowForm={props.setShowForm} key={task.title} {...task} />
                )
          }
        </div>
        <div className="overflow-none container-2">
          <h3 className="border-b-4 border-primary text-center text-xl" >{messages.done}</h3>
          {
            tasks.filter(task => task.title.includes(search) && task.isDone).length === 0
              ? <h4 className="text-center">{messages.notFound}</h4>
              : tasks
                .filter(task => task.title.includes(search) && task.isDone)
                .map(task =>
                  <Task setShowForm={props.setShowForm} key={task.title} {...task} />
                )
          }
        </div>
      </div>
    </>
  )
}
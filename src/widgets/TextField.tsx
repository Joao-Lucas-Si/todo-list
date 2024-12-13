import { ChangeEvent, useEffect, useState } from "react"

export default (props: { setValue: (value: string) => void, defaultValue?: string, id: string, label: string, isMultiLine?: boolean }) => {
  const [value, setValue] = useState(props.defaultValue ?? "")
  useEffect(() => props.setValue(value), [value])
  useEffect(() => {
    if (props.defaultValue !== value) setValue(props.defaultValue ?? "")
  }, [props.defaultValue])

  const attr = {
    className:"border-primary border-2 bg-transparent rounded-lg p-1",
    id:props.id,
    value:value,
    onChange: (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setValue(e.target.value)
  }
  return (
    <div className={`inline-flex gap-2 md:gap-4 flex-col justify-center items-center`}>
      <label className="text-center" htmlFor={props.label} >{props.label}</label>
      {props.isMultiLine 
        ? <textarea
          {...attr}        
        >{attr.value}</textarea>
        : <input
          {...attr}        
        />
      }
    </div>
  )
}
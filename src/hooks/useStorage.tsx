import { useCallback, useContext, useEffect, useState } from "react"
import { StorageDefination } from "./createStorage"
import StorageContext from "./StorageContext"

type StorageOptional<Defination extends StorageDefination, Type> = Defination["isOptional"] extends true ? Type|undefined : Type

type StorageType<Defination extends StorageDefination> = StorageOptional<
  Defination, 
  StorageArray<
    Defination,
    Defination["type"] extends "string"
    ? Defination extends { literals: any }
    ? Defination["literals"][number]
    : string
    : Defination["type"] extends "number" ?
    Defination extends { literals: any[] }
    ? { [Literal in keyof Defination["literals"]]: Defination["literals"][Literal] }[keyof Defination["literals"]]
    : number
    :
    Defination["type"] extends "boolean" ? boolean :
    Defination["type"] extends "object" ?
    Defination extends {
      schema: any
    }
    ? {
      [Property in keyof Defination["schema"]]: StorageType<Defination["schema"][Property]>
    }
    : never
    // Defination["type"] extends "function" ? 
    //   Defination extends {parameters: Record<string, StorageDefination>, returnType: StorageDefination} 
    //     ? (
    //       args: { 
    //         [Param in keyof Defination["parameters"]]: StorageType<Defination["parameters"][Param]> 
    //       }
    //     ) => StorageType<Defination["returnType"]> 
    //     : never 
    : never
  >
>

type StorageArray<Defination extends StorageDefination, Type> = Defination["isArray"] extends true ? Type[] : Type

export default <Storages extends Record<string, StorageDefination>>(storages: Storages) => <Name extends keyof Storages>(name: Name, defaultValue: StorageType<Storages[Name]>) => {
  const type = storages[name].type
  const isArray = storages[name].isArray
  type ReturnType = StorageType<Storages[Name]>
  const convertValue = (value: any): ReturnType => (
    value === "undefined" ? undefined :
    type === "object" || isArray ? JSON.parse(value) :
      type === "string" ? value :
        type === "number" ? parseFloat(value) : value
  )

  const convertStorage = (value: any) => type === "object" || isArray ? JSON.stringify(value) : String(value)

  const [value, setRealValue] = useState<ReturnType>(
    localStorage.getItem(String(name))
      ? convertValue(localStorage.getItem(String(name)))
      : defaultValue
  )

  const refresh = useCallback(() => {
    setRealValue(
      convertValue(localStorage.getItem(String(name)))
    )
  }, [name, convertValue])

  const context = useContext(StorageContext)

  useEffect(() => {
    const hook = {
        name: String(name),
        refresh
      }
    context.usedHooks.push(hook)
    context.setUsedHooks(context.usedHooks)
  }, [context.setUsedHooks])

  const [exists, setExists] = useState(!!localStorage.getItem(String(name)))

  const setValue = useCallback((newValue: ReturnType) => {
    setExists(true)
    if (newValue === undefined) localStorage.removeItem(String(name))
    else localStorage.setItem(String(name), convertStorage(newValue))
    context.usedHooks
      .filter(usedHook => usedHook.name === String(name))
      .forEach(usedHook => usedHook.refresh())
  }, [context.usedHooks, setExists])

  return [
    value,
    setValue,
    exists
  ] as const
}
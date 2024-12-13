import { ReactNode, useContext, useState } from "react";
import StorageContext from "./StorageContext";
import useStorage from "./useStorage";

// export type FunctionStorage<Params extends Record<string, any>, Type extends StorageDefination> = (params: Params) => Type


export type StorageDefination = {
  type: "string" | "object" | "number" | "boolean"
  isArray?: boolean,
  isOptional?: boolean
} & ({
  type: "object",
  schema: Record<string, StorageDefination>
}
  | {})
  & ({
    type: "string",
    literals?: Readonly<string[]>
  } | {})
  & ({
    type: "number",
    literals?: Readonly<number[]>
  } | {})
// & ({ type: "function", parameters: Record<string, Storage>, returnType: Storage } | {})

export default <Storages extends Record<string, StorageDefination>>(storages: Storages) => {
  return { 
    useStorage: useStorage(storages), 
    Provider: (props: {children: ReactNode}) => {
      const [usedHooks, setUsedHooks] = useState<{
        name: string,
        refresh: () => void}[]
      >([])
      return <StorageContext.Provider value={{ 
        usedHooks, 
        setUsedHooks 
      }} >
        {props.children}
      </StorageContext.Provider>
    } }
}

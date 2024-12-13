import { createContext } from "react";

const StorageContext = createContext<{
  usedHooks: {
    name: string,
    refresh: () => void
  }[],
  setUsedHooks: (usedHooks: {
    name: string,
    refresh: () => void
  }[]) => void
}>({ setUsedHooks: () => {}, usedHooks: [] })

export default StorageContext
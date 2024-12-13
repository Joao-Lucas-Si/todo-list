import { useEffect, useState } from "react"

export default (props:{isCheck?: boolean, setIsCheck: (isCheck: boolean) => void}) => {
  const [isCheck, setIsCheck] = useState(props.isCheck ?? false)
  useEffect(() => {
    props.setIsCheck(isCheck)
  }, [isCheck])
  return <input type="checkbox" onChange={() => setIsCheck(!isCheck)} checked={isCheck} className={`appearance-none border-4 border-primary before:content-[''] w-6 h-6 rounded ${isCheck ? "bg-primary" : ""}`} />
}
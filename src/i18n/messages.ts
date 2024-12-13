type keys = "todoList"|"portuguese"|"english"|"korean"|"add"|"title"|"tasks"|"addTask"|"delete"|"edit"|"description"|"save"|"cancel"|"search"|"priority"|"language"|"theme"|"details"|"notFound"|"done"|"notDone"

export type Messages = Record<keys, string> & {
  themes: {
    dark: string,
    light: string
  }
}
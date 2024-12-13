import createStorage, { StorageDefination } from "./createStorage"


export const { useStorage, Provider } = createStorage({
  tasks: {
    isArray: true,
    type: "object",
    schema: {
      title: {
        type: "string"
      },
      priority: {
        type: "number",
        literals: [0,1,2,3,4] as const
      },
      isDone: {
        type: "boolean"
      },
      description: {
        type: "string",
        isOptional: true
      },
    }
  },
  theme: {
    type: "string",
    literals: ["dark", "light"] as const
  },
  language: {
    type: "string",
    literals: ["portuguese", "english", "korean"] as const
  },
  task: {
    type: "object",
    isOptional: true,
    schema: {
      title: {
        type: "string"
      },
      priority: {
        type: "number",
        literals: [0,1,2,3,4] as const
      },
      isDone: {
        type: "boolean"
      },
      description: {
        type: "string",
        isOptional: true
      },
    }
  }
})

import { createContext } from "react";
import { Messages } from "../i18n/messages";

const LanguageContext = createContext<Record<string, Messages>>({})

export default LanguageContext

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import LanguageContext from "./hooks/LanguageContext";
import { English } from "./i18n/english";
import { Korean } from "./i18n/korean";
import { Portuguese } from "./i18n/portuguese";
import { useStorage, Provider as StorageProvider } from "./hooks/storage";
import { HelmetProvider } from "react-helmet-async"

const container = document.getElementById("root") as HTMLElement;

const root = createRoot(container);


root.render(
  <StrictMode>
    <StorageProvider>
      <HelmetProvider>
        <LanguageContext.Provider 
          value={{
            portuguese: Portuguese,
            korean: Korean,
            english: English,
          }} 
        >
          
            <App />
        </LanguageContext.Provider>
      </HelmetProvider>
    </StorageProvider>
  </StrictMode>
);

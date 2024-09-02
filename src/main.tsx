import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import CalculatorContextProvider from "./context/CalculatorContext.tsx";

createRoot(document.getElementById("root")!).render(
  <CalculatorContextProvider>
    <App />
  </CalculatorContextProvider>
);

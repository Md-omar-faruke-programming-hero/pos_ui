import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProductSearchProvider } from "./context/ProductSearchContext.tsx";
import { EmployeeProvider } from "./context/employeeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductSearchProvider>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </ProductSearchProvider>
  </StrictMode>
);

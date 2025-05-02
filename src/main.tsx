import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProductSearchProvider } from "./context/ProductSearchContext.tsx";
import { EmployeeProvider } from "./context/employeeContext.tsx";
import { InvoiceProvider } from "./context/invoiceContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductSearchProvider>
      <EmployeeProvider>
        <InvoiceProvider>
          <App />
        </InvoiceProvider>
      </EmployeeProvider>
    </ProductSearchProvider>
  </StrictMode>
);

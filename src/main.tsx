import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProductSearchProvider } from "./context/ProductSearchContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductSearchProvider>
      <App />
    </ProductSearchProvider>
  </StrictMode>
);

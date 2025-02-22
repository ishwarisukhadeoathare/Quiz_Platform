import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found!");
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <Toaster />
      <App />
    </StrictMode>
  );
}

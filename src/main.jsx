import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme.js";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./components/LoginContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </LoginProvider>
    </BrowserRouter>
  </StrictMode>,
);

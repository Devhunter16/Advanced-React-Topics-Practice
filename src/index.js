import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./components/store/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));

// We add .Provider to our AuthContext wrapper so that all components, no matter how deep have access to the Context. AuthContext is provided to those components.
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);

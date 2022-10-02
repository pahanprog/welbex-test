import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import ContextProvider from "./context/ContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// axios default set up
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);

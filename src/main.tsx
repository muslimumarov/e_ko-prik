import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n.ts";
// import App from "./App.tsx";
import "./index.css";
import 'leaflet/dist/leaflet.css';
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/*<App />*/}
      <App/>
  </React.StrictMode>,
);

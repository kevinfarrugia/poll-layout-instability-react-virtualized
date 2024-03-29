import "./style.css";

import React from "react";
import ReactDOM from "react-dom";

import App from "./js/components/App";

ReactDOM.render(<App />, document.getElementById("root"));

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        // eslint-disable-next-line no-console
        console.log("Successfully registered service worker", reg);
      })
      .catch((err) => {
        console.warn("Error whilst registering service worker", err);
      });
  });
}

import React from "react";
import ReactDOM from "react-dom";
import  App  from "./App";
import { Yprovider } from "./components/context/Ycontext";

ReactDOM.render(
  <Yprovider>
    <App />
  </Yprovider>,
  document.getElementById("rate")
);

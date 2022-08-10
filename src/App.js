
import React from "react";
import { Header } from "./components/header";
import { TreeElement } from "./components/tree";

import "./app.css";

export const App = () => {

  return (
    <>
      <Header />
      <div id="left-panel">
        <div id="tree-container"><TreeElement /></div>
      </div>
      <div id="center-panel">"preview"</div>
      <div id="right-panel">"properties"</div>
      <div id="bottom-panel">"resources"</div>
    </>
  );
}
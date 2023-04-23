
import React from "react";
import "./app.css";

import { Header } from "./components/header";
import { TreeElement } from "./components/tree";
import { PropertiesPanel } from "./components/properties";
import { TreeOptionsPopup } from "./components/treeOptions";
import { ResourcesPanel } from "./components/resources";


export const App = () => {
  window.addEventListener("contextmenu", (event) => event.preventDefault());

  return (
    <>
      <Header />
      <div id="left-panel">
        <TreeElement />
        <TreeOptionsPopup />
      </div>
      <div id="center-panel">"preview"</div>
      <div id="right-panel"><PropertiesPanel /></div>
      <div id="bottom-panel"><ResourcesPanel /></div>
    </>
  );
}
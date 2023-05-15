
import React from "react";
import "./app.css";

import { Stage } from 'react-pixi-fiber';

import { Header } from "./components/header";
import { TreeController, TreeOptionsPopup } from "./components/tree";
import { PropertiesPanel } from "./components/properties";
import { ResourcesPanel, ResourcesOptionsPopup } from "./components/resources";
import { PreviewPanel } from "./components/preview";
import store from "./store";

window["__store"] = store;

export const App = () => {
  window.addEventListener("contextmenu", (event) => event.preventDefault());

  return (
    <>
      <Header />
      <div id="left-panel">
        <TreeController />
      </div>
      <div id="center-panel">
        <Stage options={{ backgroundColor: 0xffffff }}>
          <PreviewPanel />
        </Stage>
      </div>
      <div id="right-panel">
        <PropertiesPanel />
      </div>
      <div id="bottom-panel">
        <ResourcesPanel />
      </div>
      <TreeOptionsPopup />
      <ResourcesOptionsPopup />
    </>
  );
}

import React from "react";
import "./app.css";

// I have to copy it because the available npm packages incompatible with pixi 4.6.0 this project use 
import "./tools/mixin-get-child-by-name";

import { Stage } from 'react-pixi-fiber';

import { Header } from "./components/header";
import { TreeController, TreeOptionsPopup } from "./components/tree";
import { PropertiesPanel } from "./components/properties";
import { ResourcesPanel, ResourcesOptionsPopup } from "./components/resources";
import { PreviewPanel } from "./components/preview";
import store from "./store";
import { InteractiveTransformTools } from "./components/transformTools/InteractiveTransformTools";

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
          <InteractiveTransformTools />
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
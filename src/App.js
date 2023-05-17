
import React, { useState, useRef, useEffect } from "react";
import "./app.css";

import store from "./store";

import { Stage } from 'react-pixi-fiber';
import { Application } from "pixi.js"

import { Header } from "./components/header";
import { TreeController, TreeOptionsPopup } from "./components/tree";
import { PropertiesPanel } from "./components/properties";
import { ResourcesPanel, ResourcesOptionsPopup } from "./components/resources";
import { PreviewPanel } from "./components/preview";

import { InteractiveTransformTools } from "./components/transformTools/InteractiveTransformTools";
import { ViewCameraController } from "./services/ViewCameraController";
import { ViewResizeController } from "./services/ViewResizeController";
// I have to copy it because the available npm packages incompatible with pixi 4.6.0 this project use 
import { getChildByName } from "./services/ViewGetChildByName";
import { ViewGizmoPositionArrows } from "./services/ViewGizmoPositionArrows";

window["__store"] = store;

export const App = () => {
  window.addEventListener("contextmenu", (event) => event.preventDefault());

  const [services, setServices] = useState(null);
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    const app = new Application({
      backgroundColor: 0xffffff,
      view: canvasRef.current
    });

    setServices({
      app,
      camera: new ViewCameraController(app.view, app.ticker, { min: 1, max: 3 }),
      resize: new ViewResizeController(canvasContainerRef.current, app.renderer, { width: 1280, height: 1280 }),
      gizmoPositionArrows: new ViewGizmoPositionArrows(app.ticker),
      getChildByName,
    });

  }, []);

  return (
    <>
      <Header />
      <div id="left-panel">
        <TreeController />
      </div>
      <div ref={canvasContainerRef} id="center-panel">
        <canvas ref={canvasRef}></canvas>
        {
          services === null ? null : (
            <Stage app={services.app}>
              <PreviewPanel services={services} />
              <InteractiveTransformTools services={services} />
            </Stage>
          )
        }
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
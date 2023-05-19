
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
import { getChildByName, getChildRelativePosition, getGlobalRotation } from "./services/ViewTools";
import { ViewGizmoPositionArrows } from "./services/ViewGizmoPositionArrows";

import move from "./assets/icons/move.png";
import resize from "./assets/icons/resize.png";
import rotate from "./assets/icons/rotate.png";

import { ViewGizmoScaleBox } from "./services/ViewGizmoScaleBox";
import { DOMGizmoButtons } from "./services/DOMGizmoButtons";

window["__store"] = store;

export const App = () => {
  window.addEventListener("contextmenu", (event) => event.preventDefault());

  const [services, setServices] = useState(null);
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const gizmoButtons = {
    move: useRef(null),
    resize: useRef(null),
    rotate: useRef(null),
  };

  useEffect(() => {
    const app = new Application({
      backgroundColor: 0xffffff,
      view: canvasRef.current
    });

    console.log(gizmoButtons);
    setServices({
      app,
      camera: new ViewCameraController(app.view, app.ticker, { min: 1, max: 3 }),
      resize: new ViewResizeController(canvasContainerRef.current, app.renderer, { width: 1280, height: 1280 }),
      gizmoPositionArrows: new ViewGizmoPositionArrows(app.ticker),
      gizmoScaleBox: new ViewGizmoScaleBox(app.ticker),
      gizmoButtons: new DOMGizmoButtons({
        move: gizmoButtons.move.current,
        resize: gizmoButtons.resize.current,
        rotate: gizmoButtons.rotate.current,
      }),
      pixiTools: {
        getChildByName,
        getChildRelativePosition,
        getGlobalRotation
      }
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
      <div id="gizmo-buttons">
        <input ref={gizmoButtons.move} type="image" className="gizmoButton" src={move} />
        <input ref={gizmoButtons.resize} type="image" className="gizmoButton" src={resize} />
        <input ref={gizmoButtons.rotate} type="image" className="gizmoButton" src={rotate} />
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
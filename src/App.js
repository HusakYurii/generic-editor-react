
import React, { useState } from "react";
import { Header } from "./components/header";
import { Tree } from "./components/tree";

import "./app.css";
import { NodeData } from "./data/NodeData";
import { getUID } from "./tools/uidGenerator";

export const App = () => {
  const [tree, setTree] = useState(
    new NodeData(getUID(), [
      new NodeData(getUID()),
      new NodeData(getUID(), [
        new NodeData(getUID()),
        new NodeData(getUID())
      ]),
      new NodeData(getUID(), [
        new NodeData(getUID(), [
          new NodeData(getUID()),
          new NodeData(getUID())
        ])
      ])
    ]));

  return (
    <>
      <Header />
      <div id="left-panel">
        <div id="tree-container"><Tree tree={tree} /></div>
      </div>
      <div id="center-panel">"preview"</div>
      <div id="right-panel">"properties"</div>
      <div id="bottom-panel">"resources"</div>
    </>
  );
}
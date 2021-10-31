
import React, { useState } from "react";
import { Header } from "./components/header";
import { Tree } from "./components/tree";

import "./app.css";
import { createNode } from "./data/NodeData";
import { createGenerator } from "./tools/uidGenerator";

export const App = () => {

  const getUID = createGenerator(1);

  const [tree, setTreeState] = useState(
    createNode(getUID(), [
      createNode(getUID()),
      createNode(getUID(), [
        createNode(getUID()),
        createNode(getUID())
      ]),
      createNode(getUID(), [
        createNode(getUID(), [
          createNode(getUID()),
          createNode(getUID())
        ])
      ])
    ]));

  const params = {
    tree,
    hooks: {
      setTreeState,
      getUID
    }
  }
  return (
    <>
      <Header />
      <div id="left-panel">
        <div id="tree-container"><Tree {...params} /></div>
      </div>
      <div id="center-panel">"preview"</div>
      <div id="right-panel">"properties"</div>
      <div id="bottom-panel">"resources"</div>
    </>
  );
}
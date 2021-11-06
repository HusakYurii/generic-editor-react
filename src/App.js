
import React, { useState } from "react";

import "./app.css";

import { Header } from "./components/header";
import { createNode } from "./data/NodeData";
import { createGenerator } from "./tools/uidGenerator";
import { HierarchyPanel } from "./components/hierarchy-panel/HierarchyPanel";

export const App = () => {

  const getUID = createGenerator(1);
  /* @TODO There is one downside of having the data here.
     When the tree data is being updated in <Tree>, the whole App is being rerendered
     Think of moving keeping the tree data here but as an object and pass it to <Tree>.
     In the <Tree> we can set the tree data as initial value to useState(). By doing that only tree will be rerendered
  */
  const [tree, setTree] = useState(
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

  const [nodeId, setNodeId] = useState(null);

  const appStore = {
    data: {
      tree
    },
    hooks: {
      setNodeId,
      setTree,
      getUID
    }
  }
  return (
    <>
      <Header />
      <HierarchyPanel {...appStore} />
      <div id="preview-panel">"preview"</div>
      <div id="properties-panel">"properties"</div>
      <div id="resources-panel">"resources"</div>
    </>
  );
}
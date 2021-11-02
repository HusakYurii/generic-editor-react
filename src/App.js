
import React, { useRef, useState } from "react";
import { Header } from "./components/header";
import { Tree } from "./components/tree";

import "./app.css";
import { createNode } from "./data/NodeData";
import { createGenerator } from "./tools/uidGenerator";

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

  const selectedNode = useRef();

  const appStore = {
    data: {
      tree
    },
    hooks: {
      selectNode: (nodeId) => selectedNode.current = nodeId,
      setTreeState: (treeData) => setTree(() => treeData),
      getUID
    }
  }
  return (
    <>
      <Header />
      <div id="left-panel">
        <div id="tree-container"><Tree {...appStore} /></div>
      </div>
      <div id="center-panel">"preview"</div>
      <div id="right-panel">"properties"</div>
      <div id="bottom-panel">"resources"</div>
    </>
  );
}
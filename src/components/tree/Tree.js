import React from "react";
import { Node } from "./Node";

import "./tree.css";

/**
 * 
 * @param {{tree: import("../../data/NodeData").INodeData}} props
 * 
 *  
 */
export const Tree = ({ tree }) => {
    let targetElement

    const handleDragStart = (event) => {
        console.log("handleDragStart");
        console.log(event.target.getAttribute("data-id"))
    };

    const handleDrop = (event) => {
        event.preventDefault();
        console.log("handleDrop");
        console.log(event.target.getAttribute("data-id"))
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        console.log("handleDragOver");
    };

    const handlers = {
        handleDragStart,
        handleDragOver
    };

    return (
        <div id="root-node"
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div id="root-node-name" data-id={tree.id}>{tree.name}</div>
            <div id="root-node-nodes">{
                tree.nodes.map(node => (
                    <Node
                        key={node.id}
                        node={node}
                    />
                ))
            }</div>
        </div>
    );
}
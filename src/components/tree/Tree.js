import React from "react";
import { Node } from "./Node";

import "./tree.css";

export const Tree = ({ tree }) => {
    const handleDragStart = (node) => {
        console.log("handleDragStart");
        console.log(node);
    };
    const handleDragEnd = (node) => {
        console.log("handleDragStart");
        console.log(node);
    };
    const handleDragOver = (node) => {
        console.log("handleDragOver");
        console.log(node.id);
    };

    const handlers = {
        handleDragStart,
        handleDragEnd,
        handleDragOver
    };



    return (
        <div id="root-node">
            <div id="root-node-indicator" >
                <div id="root-node-name"
                    onDragOver={handleDragOver.bind(null, tree)}
                >{tree.name}</div>
            </div>
            <div id="root-node-nodes">{
                tree.nodes.map(node => (
                    <Node
                        key={node.id}
                        node={node}
                        handlers={handlers}
                    />
                ))
            }</div>
        </div>
    );
}
import React from "react";
import { cloneNodeShallow, createNode } from "../../data/NodeData";
import { getNodeByID, isChild, isParent } from "../../tools/treeTools";
import { getPositionInTheBox } from "../../tools/treeUITools";
import { Node } from "./Node";

import "./tree.css";

const UI_CLASS_NAMES = {
    center: "insert-center",
    top: "insert-before",
}

const resetStyles = (nodeElement) => {
    Object.values(UI_CLASS_NAMES).forEach((className) => {
        if (nodeElement.classList.contains(className)) {
            nodeElement.classList.toggle(className)
        }
    });
}

export const Tree = ({ tree, hooks }) => {

    /* Some important rules the code follows
        - we can't set a node to itself
        - we can't set a node to its parent again (there is no sense in it )
        - we can't set an node to any of its children
    */
    let draggedNodeData = createNode(-1);
    let targetNodeData = createNode(-1);
    let hoverNodeElement = document.createElement("div");
    let hoverNodeElementStyle = "";


    const handleDragStart = (event) => {
        draggedNodeData = getNodeByID(Number(event.target.getAttribute("data-id")), tree);
    };

    const handleDrop = (event) => {
        console.log("handleDrop");
        if (!targetNodeData || targetNodeData.id < 0) {
            return;
        }

        console.log(targetNodeData.id)
    };

    const handleDragOver = (event) => {
        // for some reason preventDefault() has to be used otherwise onDrop event will not work
        event.preventDefault();

        /* The node data which is being dragged over */
        const hoveredNodeData = getNodeByID(Number(event.target.getAttribute("data-id")), tree);

        const isValid = (
            draggedNodeData.id !== hoveredNodeData.id && /* Check if node is not the same */
            !isChild(hoveredNodeData.id, draggedNodeData) && /* Check if hovered node is a child of the dragged node */
            !isParent(draggedNodeData.id, hoveredNodeData) /* Check if hovered node is a parent of the dragged node */
        );

        if (!isValid) {
            targetNodeData = createNode(-1);
            return;
        }

        if (hoverNodeElement !== event.target) {
            resetStyles(hoverNodeElement);
            hoverNodeElement = event.target;
            hoverNodeElementStyle = "";
        }

        /* Get mouse position within the element we drag over and if the mouse position is
        new, reset all of the styles and set new one */
        const position = getPositionInTheBox(hoverNodeElement.getBoundingClientRect(), event.clientX, event.clientY);
        if (position !== hoverNodeElementStyle) {
            resetStyles(hoverNodeElement);
            hoverNodeElement.classList.toggle(UI_CLASS_NAMES[position])
        }

        targetNodeData = hoveredNodeData;
    };

    const handleDragEnd = (event) => {
        /*No matter where we dropped the dragged element (within or outside tree bounds),
         reset styles for the last hovered node element and reset the temporary data*/
        resetStyles(hoverNodeElement);

        draggedNodeData = createNode(-1);
        targetNodeData = createNode(-1);
        hoverNodeElement = document.createElement("div");
        hoverNodeElementStyle = "";
    };

    return (
        /* An interesting fact:
          onDrop will be handled by Chrome browser first and then handle onDragEnd.
          That is why the data is being reset in onDragEnd, in this component.
          If there are any bugs in other browsers , consider this comment while debugging
        */
        <div id="root-node"
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
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
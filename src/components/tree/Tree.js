import React from "react";
import { createNode } from "../../data/NodeData";
import { appendNode, getNodeByID, insertBefore, isChild, isParent, removeNode } from "../../tools/treeTools";
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
        if (draggedNodeData.id < 0 || targetNodeData.id < 0) {
            handleDragEnd(event);
            return;
        }

        const newTreeData = { ...tree };

        if (!removeNode(draggedNodeData.id, newTreeData)) {
            throw new Error(`Tree: the node with id ${draggedNodeData.id} has not been removed!`);
        }

        if (hoverNodeElementStyle === "center") {
            appendNode(draggedNodeData, targetNodeData.id, newTreeData);
        }
        else {
            insertBefore(draggedNodeData, targetNodeData.id, newTreeData)
        }

        hooks.setTreeState(newTreeData);

        handleDragEnd(event);
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
            hoverNodeElementStyle = position;
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
        // @TODO test in which order events are fired in the browser
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
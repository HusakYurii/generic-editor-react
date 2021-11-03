import React from "react";
import { cloneNodeDeep, createNode } from "../../data/NodeData";
import { appendNode, getNodeByID, getParent, insertBefore, isChild, isParent, removeNode } from "../../tools/treeTools";
import { getPositionInTheBox, PositionsInTheBox } from "../../tools/treeUITools";
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

export const Tree = ({ data, hooks }) => {

    /* Some important rules the code follows
        - we can't set a node to itself
        - we can't set a node to its parent again (there is no sense in it )
        - we can't set a node to any of its children
        - a node can be appended to another node
        - a node can be appended inserted before another node
        - we can't set a node before a root node, only append
    */
    let draggedNodeData = createNode(-1);
    let targetNodeData = createNode(-1);
    let hoverNodeElement = document.createElement("div");
    let insertPosition = "";


    const handleDragStart = (event) => {
        draggedNodeData = getNodeByID(Number(event.target.getAttribute("data-id")), data.tree);
    };

    const handleDrop = (event) => {
        if (draggedNodeData.id < 0 || targetNodeData.id < 0) {
            handleDragEnd(event);
            return;
        }

        const newTreeData = cloneNodeDeep(data.tree);

        if (!removeNode(draggedNodeData.id, newTreeData)) {
            throw new Error(`Tree: the node with id ${draggedNodeData.id} has not been removed!`);
        }

        if (insertPosition === PositionsInTheBox.center) {
            appendNode(draggedNodeData, targetNodeData.id, newTreeData);
        }
        else {
            insertBefore(draggedNodeData, targetNodeData.id, newTreeData)
        }

        hooks.setTree(() => newTreeData);

        handleDragEnd(event);
    };

    const handleDragOver = (event) => {
        /* for some reason preventDefault() has to be used otherwise onDrop event will not work */
        event.preventDefault();

        /* The node data which is being dragged over */
        const hoveredNodeData = getNodeByID(Number(event.target.getAttribute("data-id")), data.tree);

        const isValid = (
            draggedNodeData.id !== hoveredNodeData.id && /* Check if the nodes are NOT the same */
            !isChild(hoveredNodeData.id, draggedNodeData) && /* Check if a hovered node is NOT a child of the dragged node */
            !isParent(draggedNodeData.id, hoveredNodeData) && /* Check if a hovered node is NOT a parent of the dragged node */
            getParent(hoveredNodeData.id, data.tree) !== null /* Check if a hovered node is NOT a root node */
        );

        if (!isValid) {
            resetStyles(hoverNodeElement);
            targetNodeData = createNode(-1);
            return;
        }

        if (hoverNodeElement !== event.target) {
            resetStyles(hoverNodeElement);
            hoverNodeElement = event.target;
            insertPosition = "";
        }

        /* Get mouse position within the element we drag over and if the mouse position is
        new, reset all of the styles and set new one */
        const position = getPositionInTheBox(hoverNodeElement.getBoundingClientRect(), event.clientX, event.clientY);

        /* We don't highlight the bottom part because we cant insert node there anyway.
        We use functionality to append node which is basically the same  */
        if (position !== PositionsInTheBox.bottom && position !== insertPosition) {
            resetStyles(hoverNodeElement);
            insertPosition = position;
            hoverNodeElement.classList.toggle(UI_CLASS_NAMES[position])
        }

        targetNodeData = hoveredNodeData;
    };

    const handleDragEnd = (event) => {
        /* No matter where we dropped the dragged element (within or outside tree bounds),
         reset styles for the last hovered node element and reset the temporary data */
        resetStyles(hoverNodeElement);

        draggedNodeData = createNode(-1);
        targetNodeData = createNode(-1);
        hoverNodeElement = document.createElement("div");
        insertPosition = "";
    };

    const handleClick = (event) => {
        if (!event.target.hasAttribute("data-id")) {
            hooks.setNodeId(() => null);
            return;
        }
        const selectedID = Number(event.target.getAttribute("data-id"));
        hooks.setNodeId(() => selectedID);
    }

    return (
        // @TODO test in which order events are fired in the browser
        <div id="root-node"
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <div id="root-node-name" data-id={data.tree.id}>{data.tree.name}</div>
            <div id="root-node-nodes">{
                data.tree.nodes.map(node => (
                    <Node
                        key={node.id}
                        node={node}
                    />
                ))
            }</div>
        </div>
    );
}
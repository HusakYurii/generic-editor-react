import React from "react";
import { createNode } from "../../data/NodeData";
import { getNodeByID, isChild, isParent } from "../../tools/treeTools";
import { getPositionInTheBox, PositionsInTheBox } from "../../tools/treeUITools";
import { Node } from "./Node";

import "./tree.css";

import { connect } from "react-redux";
import { moveNodeAction, insertBeforeNodeAction, setSelectedNodeIDAction } from "../../store/tree";
import { ROOT_NODE_ID } from "../../data/StoreData";
import store from "../../store";
import { Tree } from "./Tree";

const UI_CLASS_NAMES = {
    [PositionsInTheBox.CENTER]: "insert-center",
    [PositionsInTheBox.TOP]: "insert-before",
};

const resetStyles = (nodeElement) => {
    Object.values(UI_CLASS_NAMES).forEach((className) => {
        nodeElement.classList.remove(className);
    });
};

/**
 * @typedef {{
* moveNodeAction: typeof moveNodeAction;
* insertBeforeNodeAction: typeof insertBeforeNodeAction;
* setSelectedNodeIDAction: typeof setSelectedNodeIDAction;
* }} TreeComponentControllerDependencies
*/

/**
* @param { TreeComponentControllerDependencies} props 
*/
const TreeComponentController = ({ moveNodeAction, insertBeforeNodeAction, setSelectedNodeIDAction }) => {

    /* Some important rules the code follows
        - we can't set a node to itself
        - we can't set a node to its parent again (there is no sense in it )
        - we can't set a node to any of its children
        - a node can be appended to another node
        - a node can be inserted before another node
        - we can't set a node before a root node, only append
    */
    let draggedNodeData = createNode(-1);
    let targetNodeData = createNode(-1);
    let hoverNodeElement = document.createElement("div");
    let insertPosition = ("");


    const handleDragStart = (event) => {
        const treeData = store.getState().tree.treeData;
        draggedNodeData = getNodeByID(Number(event.target.getAttribute("data-id")), treeData);
    };

    const handleDrop = (event) => {
        if (draggedNodeData.id < 0 || targetNodeData.id < 0) {
            handleDragEnd(event);
            return;
        }

        if (insertPosition === PositionsInTheBox.CENTER) {
            moveNodeAction({ nodeData: draggedNodeData, referenceID: targetNodeData.id });
        }
        else {
            insertBeforeNodeAction({ nodeData: draggedNodeData, referenceID: targetNodeData.id });
        }

        handleDragEnd(event);
    };

    const handleDragOver = (event) => {
        /* for some reason preventDefault() has to be used otherwise onDrop event will not work */
        event.preventDefault();

        const treeData = store.getState().tree.treeData;
        /* The node data which is being dragged over */
        const hoveredNodeData = getNodeByID(Number(event.target.getAttribute("data-id")), treeData);

        const isValid = (
            hoveredNodeData && //  to catch the case when a hovered html element is not valid (doesn't have the node data)
            draggedNodeData.id !== hoveredNodeData.id && /* Check if the nodes are NOT the same */
            !isChild(hoveredNodeData.id, draggedNodeData) && /* Check if a hovered node is NOT a child of the dragged node */
            !isParent(draggedNodeData.id, hoveredNodeData) /* Check if a hovered node is NOT a parent of the dragged node */
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
        let position = getPositionInTheBox(hoverNodeElement.getBoundingClientRect(), event.clientX, event.clientY);

        /* We don't highlight the bottom part because we cant insert node there anyway.
        We use functionality to append node which is basically the same  */
        if (position !== PositionsInTheBox.BOTTOM && position !== insertPosition) {
            resetStyles(hoverNodeElement);
            // we force to append a node to the PARENT node, we can't insert before it
            if (hoveredNodeData.id === ROOT_NODE_ID) {
                position = PositionsInTheBox.CENTER;
            }
            insertPosition = position;
            hoverNodeElement.classList.add(UI_CLASS_NAMES[position])

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
            setSelectedNodeIDAction(null)
            return;
        }
        const selectedID = Number(event.target.getAttribute("data-id"));
        setSelectedNodeIDAction(selectedID);
    }

    return (
        // @TODO test in what order events are fired in the browser
        <div id="tree-container"
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <Tree />
        </div>
    );
};

/**
 * @param {import("../../store").IStore} data 
 */
const mapStateToProps = (data) => {
    return {};
};

export const TreeController = connect(
    mapStateToProps,
    { moveNodeAction, insertBeforeNodeAction, setSelectedNodeIDAction }
)(TreeComponentController)
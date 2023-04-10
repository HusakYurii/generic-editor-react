import React from "react";
import { createNode } from "../../data/NodeData";
import { getNodeByID, getParent, isChild, isParent } from "../../tools/treeTools";
import { getPositionInTheBox, PositionsInTheBox } from "../../tools/treeUITools";
import { Node } from "./Node";

import "./tree.css";

import { connect } from "react-redux";
import { moveNodeAction, insertBeforeNodeAction, setSelectedNodeIDAction } from "../../store/treeReducer";

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

const Tree = (props) => {

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
    let insertPosition = "";


    const handleDragStart = (event) => {
        draggedNodeData = getNodeByID(Number(event.target.getAttribute("data-id")), props.treeData);
    };

    const handleDrop = (event) => {
        if (draggedNodeData.id < 0 || targetNodeData.id < 0) {
            handleDragEnd(event);
            return;
        }

        if (insertPosition === PositionsInTheBox.center) {
            props.moveNodeAction({
                nodeData: draggedNodeData,
                referenceID: targetNodeData.id
            });
        }
        else {
            props.insertBeforeNodeAction({
                nodeData: draggedNodeData,
                referenceID: targetNodeData.id
            });
        }

        handleDragEnd(event);
    };

    const handleDragOver = (event) => {
        /* for some reason preventDefault() has to be used otherwise onDrop event will not work */
        event.preventDefault();

        /* The node data which is being dragged over */
        const hoveredNodeData = getNodeByID(Number(event.target.getAttribute("data-id")), props.treeData);

        const isValid = (
            draggedNodeData.id !== hoveredNodeData.id && /* Check if the nodes are NOT the same */
            !isChild(hoveredNodeData.id, draggedNodeData) && /* Check if a hovered node is NOT a child of the dragged node */
            !isParent(draggedNodeData.id, hoveredNodeData) && /* Check if a hovered node is NOT a parent of the dragged node */
            //@TODO rethink this one, maybe it will be good to enable it to make it easy to move elements around
            getParent(hoveredNodeData.id, props.treeData) !== null /* Check if a hovered node is NOT a root node */
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
            props.setSelectedNodeIDAction(null)
            return;
        }
        const selectedID = Number(event.target.getAttribute("data-id"));
        props.setSelectedNodeIDAction(selectedID);
    }

    return (
        // @TODO test in what order events are fired in the browser
        <div id="root-node"
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <div id="root-node-name" data-id={props.treeData.id}>{props.treeData.name}</div>
            <div id="root-node-nodes">{
                props.treeData.nodes.map(node => (
                    <Node
                        key={node.id}
                        node={node}
                    />
                ))
            }</div>
        </div>
    );
};

const mapStateToProps = ({ treeReducer }) => {
    return {
        treeData: treeReducer.treeData,
    };
};

export const TreeElement = connect(
    mapStateToProps,
    { moveNodeAction, insertBeforeNodeAction, setSelectedNodeIDAction }
)(Tree)
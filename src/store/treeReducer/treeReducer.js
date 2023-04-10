import { TREE_ACTIONS } from "./treeActionTypes";
import { getUID } from "../../tools/uidGenerator";
import { removeNode, appendNode, insertBefore, changeNodeName, changeRootNodeName } from "../../tools/treeTools";
import { createNode } from "../../data/NodeData";

/**
 * @typedef {{
 * treeData: import("../../data/NodeData").INodeData;
 * selectedNodeID: null | number;
 * }} TreeState;
 */

/**
 * @typeof TreeState
 */
const INITIAL_TREE = {
    treeData: createNode(getUID(), [
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
    ]),
    selectedNodeID: null
};;

/**
 * 
 * @param {TreeState} state 
 * @param {*} payload 
 * @returns {TreeState}
 */
const processInsertBeforeNodeAction = (state, payload) => {
    const treeData = { ...state.treeData }
    const newState = { ...state, treeData };
    // remove the dragged node from tree
    if (!removeNode(payload.nodeData.id, newState.treeData)) {
        throw new Error(`Tree Reducer: the node with id ${payload.referenceID} has not been removed!`);
    }
    // insert the dragged node into new place
    insertBefore(payload.nodeData, payload.referenceID, newState.treeData);
    return newState;
};

/**
 * 
 * @param {TreeState} state 
 * @param {*} payload 
 * @returns {TreeState}
 */
const processMoveNodeAction = (state, payload) => {
    const treeData = { ...state.treeData }
    const newState = { ...state, treeData };
    // remove the dragged node from tree
    if (!removeNode(payload.nodeData.id, newState.treeData)) {
        throw new Error(`Tree Reducer: the node with id ${payload.referenceID} has not been removed!`);
    }
    // insert the dragged node into new place
    appendNode(payload.nodeData, payload.referenceID, newState.treeData);
    return newState;
};

/**
 * 
 * @param {TreeState} state 
 * @param {*} payload 
 * @returns {TreeState}
 */
const processSelectNodeIDAction = (state, payload) => {
    const newState = { ...state, selectedNodeID: payload };
    return newState;
};

/**
 * 
 * @param {TreeState} state 
 * @param {*} payload 
 * @returns {TreeState}
 */
const processUpdateNodeNameAction = (state, payload) => {
    const treeData = { ...state.treeData }
    const newState = { ...state, treeData };

    if (!changeNodeName(newState.treeData, payload.nodeID, payload.name)) {
        // if the the function above didn't work, I assume we selected the root node
        if (!changeRootNodeName(newState.treeData, payload.name)) {
            throw new Error(`Tree Reducer: can't update the the node with id ${payload.referenceID} `);
        }
    }
    return newState;
}

/**
 * 
 * @param {TreeState} state 
 * @param {{type: string; payload: any}} data 
 * @returns {TreeState}
 */
export const treeReducer = (state = INITIAL_TREE, { type, payload }) => {
    switch (type) {
        case TREE_ACTIONS.SET_SELECTED_NODE_ID:
            return processSelectNodeIDAction(state, payload);

        case TREE_ACTIONS.INSERT_BEFORE_NODE:
            return processInsertBeforeNodeAction(state, payload);

        case TREE_ACTIONS.MOVE_NODE:
            return processMoveNodeAction(state, payload);

        case TREE_ACTIONS.APPEND_NODE: return state;

        case TREE_ACTIONS.UPDATE_NODE_NAME:
            return processUpdateNodeNameAction(state, payload);

        case TREE_ACTIONS.DELETE_NODE: return state;
        default: return state;
    }
};


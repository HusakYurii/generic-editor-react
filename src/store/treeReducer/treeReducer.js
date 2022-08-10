import { TREE_ACTIONS } from "./treeActionTypes";
import { getUID } from "../../tools/uidGenerator";
import { removeNode, appendNode, insertBefore } from "../../tools/treeTools";
import { createNode } from "../../data/NodeData";

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

const processSelectNodeIDAction = (state, payload) => {
    const newState = { ...state, selectedNodeID: payload };
    return newState;
};

export const treeReducer = (state = INITIAL_TREE, { type, payload }) => {
    switch (type) {
        case TREE_ACTIONS.SET_SELECTED_NODE_ID:
            return processSelectNodeIDAction(state, payload);

        case TREE_ACTIONS.INSERT_BEFORE_NODE:
            return processInsertBeforeNodeAction(state, payload);

        case TREE_ACTIONS.MOVE_NODE:
            return processMoveNodeAction(state, payload);

        case TREE_ACTIONS.APPEND_NODE: return state;

        case TREE_ACTIONS.UPDATE_NODE: return state;
        case TREE_ACTIONS.DELETE_NODE: return state;
        default: return state;
    }
};



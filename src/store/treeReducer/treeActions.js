import { TREE_ACTIONS } from "./treeActionTypes"

/**
 * 
 * @param {number | null} nodeID 
 * @returns 
 */
export const setSelectedNodeID = (nodeID) => {
    return { type: TREE_ACTIONS.SET_SELECTED_NODE_ID, payload: nodeID }
};

/**
 * Append node is used just to append newly created nodes
 * @param {{
 * referenceID: number;
 * nodeData: import("../../data/NodeData").INodeData;
 * }} payload 
 * @returns 
 */
export const appendNode = (payload) => {
    return { type: TREE_ACTIONS.APPEND_NODE, payload }
};

/**
 * Move node is used when we move (re-append) a node into a new parent
 * @param {{
 * referenceID: number;
 * nodeData: import("../../data/NodeData").INodeData;
 * }} payload 
 * @returns 
 */
export const moveNode = (payload) => {
    return { type: TREE_ACTIONS.MOVE_NODE, payload }
};

/**
 * This function is called when we want to move (re-append) a node. But,
 * unlike `moveNode` function this one inserts the node before the reference one
 * @param {{
 * referenceID: number;
 * nodeData: import("../../data/NodeData").INodeData;
 * }} payload 
 * @returns 
 */
export const insertBeforeNode = (payload) => {
    return { type: TREE_ACTIONS.INSERT_BEFORE_NODE, payload }
};

/**
 * When we update any params of the selected node (find node by nodeID)
 * @param {{nodeID: number, properties: Record<string, unknown>}} payload 
 * @returns 
 */
export const updateNode = (payload) => {
    return { type: TREE_ACTIONS.UPDATE_NODE, payload }
};

/**
 * To delete a node from a tree by its nodeID
 * @param {{nodeID: number}} payload 
 * @returns 
 */
export const deleteNode = (payload) => {
    return { type: TREE_ACTIONS.DELETE_NODE, payload }
};
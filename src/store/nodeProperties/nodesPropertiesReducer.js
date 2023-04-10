import { getRootNodeBaseProperties } from "../defaultStoreData";
import { NODE_PROPERTIES_ACTIONS } from "./nodePropertiesActionTypes";

/**
 * @typedef {{
 * position: { x: number; y: number; }
 * scale: { x: number; y: number; }
 * rotation: number;
 * }} NodesBaseProperties;
 */

/**
 * @typedef {{
 * nodeID: number;
 * properties: NodesBaseProperties;
 * }} ActionPayload 
 */


/**
 * @typedef {{
 * [nodeID: number]: NodesBaseProperties
 * }} NodesPropertiesListState;
 */


/**
 * @typeof NodesPropertiesListState
 */
const NODES_PROPERTIES_LIST = getRootNodeBaseProperties();

/**
 * 
 * @param {NodesPropertiesListState} state 
 * @param {ActionPayload} payload 
 * @returns {NodesPropertiesListState}
 */
const processUpdateNodeBasePropertiesActions = (state, { nodeID, ...properties }) => {
    const newState = { ...state };
    const newNodeProps = { ...newState[nodeID], ...properties };
    newState[nodeID] = newNodeProps;
    return newState;
};


/**
 * 
 * @param {NodesPropertiesListState} state 
 * @param {{type: string; payload: ActionPayload}} data 
 * @returns {NodesPropertiesListState}
 */
export const nodesPropertiesListReducer = (state = NODES_PROPERTIES_LIST, { type, payload }) => {
    switch (type) {
        case NODE_PROPERTIES_ACTIONS.UPDATE_NODE_BASE_PROPERTIES:
            return processUpdateNodeBasePropertiesActions(state, payload);

        default: return state;
    }
};



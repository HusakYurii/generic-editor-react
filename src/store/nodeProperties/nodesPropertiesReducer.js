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
 * @typedef {NodesBaseProperties & {
 * nodeID: number;
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
 * @param {{type: string; payload: ActionPayload}} data 
 * @returns {NodesPropertiesListState}
 */
export const nodesPropertiesListReducer = (state = NODES_PROPERTIES_LIST, { type, payload }) => {
    switch (type) {
        case NODE_PROPERTIES_ACTIONS.UPDATE_NODE_BASE_PROPERTIES:
            const { nodeID, ...properties } = payload;
            const newState = { ...state };
            const newNodeProps = { ...newState[nodeID], ...properties };
            newState[nodeID] = newNodeProps;
            return newState;

        default: return state;
    }
};



import { ROOT_NODE_ID, getNodeProperties } from "../../data/StoreData";
import { NODE_PROPERTIES_LIST_ACTIONS } from "./actionTypes";

const AVAILABLE_PROPERTIES_LIST = {
    BASE: "BASE",
    SPRITE: "SPRITE"
};

/**
 * @typedef {{ nodeID: number; property: keyof AVAILABLE_PROPERTIES_LIST; }} IActionPayload 
 */

/**
 * @typedef {{ [nodeID: number]: string[]; }} INodesPropertiesListState;
 */


/**
 * @typeof INodesPropertiesListState
 */
const STATE = { ...getNodeProperties(ROOT_NODE_ID, [AVAILABLE_PROPERTIES_LIST.BASE]) };

/**
 * 
 * @param {INodesPropertiesListState} state 
 * @param {{type: string; payload: IActionPayload}} data 
 * @returns {INodesPropertiesListState}
 */
export const nodesPropertiesListReducer = (state = STATE, { type, payload }) => {

    if (type === NODE_PROPERTIES_LIST_ACTIONS.INIT_NODE_PROPERTIES) {
        const newState = { ...state };
        newState[payload.nodeID] = [AVAILABLE_PROPERTIES_LIST.BASE];
        return newState;
    }
    else if (type === NODE_PROPERTIES_LIST_ACTIONS.ADD_NODE_PROPERTY) {
        const newState = { ...state };
        const data = newState[payload.nodeID];
        newState[payload.nodeID] = [...data, payload.property];
        return newState;
    }
    else if (type === NODE_PROPERTIES_LIST_ACTIONS.REMOVE_NODE_PROPERTY) {
        const newState = { ...state };
        newState[payload.nodeID] = newState[payload.nodeID].filter(val => val !== payload.property);
        return newState;
    }
    else {
        return state;
    }
};
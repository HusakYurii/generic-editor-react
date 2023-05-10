import { defaultStoreData } from "../../../data/DefaultStoreData";
import { mockStoreData } from "../../../data/MockStreData";
import { getBaseProperties } from "../../../data/StoreData";
import { BASE_PROPERTIES_ACTIONS } from "./actionTypes";

/**
 * @typedef {{ 
 *  nodeID: number;
 *  properties: Partial<import("../../../data/StoreData").IBasePropertyData>
 * }} IActionPayload 
 */


/**
 * @typedef {{ [nodeID: number]: import("../../../data/StoreData").IBasePropertyData }} IBasePropertiesListState;
 */


/**
 * By default the root node has the base properties
 * @typeof IBasePropertiesListState
 */
const STATE = defaultStoreData.properties.base;
// const STATE = mockStoreData.properties.base;

/**
 * 
 * @param {IBasePropertiesListState} state 
 * @param {{type: string; payload: { nodeID: id } | IActionPayload | IBasePropertiesListState}} data 
 * @returns {IBasePropertiesListState}
 */
export const basePropertiesListReducer = (state = STATE, { type, payload }) => {
    if (type === BASE_PROPERTIES_ACTIONS.INIT_BASE_PROPERTIES) {
        const newState = { ...state, [payload.nodeID]: getBaseProperties() };
        return newState;
    }

    else if (type === BASE_PROPERTIES_ACTIONS.REMOVE_BASE_PROPERTIES) {
        const newState = { ...state };
        delete newState[payload.nodeID];
        return newState;
    }

    else if (type === BASE_PROPERTIES_ACTIONS.UPDATE_BASE_PROPERTIES) {
        const { nodeID, properties } = payload;
        const newState = { ...state };
        const newNodeProps = { ...newState[nodeID], ...properties };
        newState[nodeID] = newNodeProps;
        return newState;
    }

    else if (type === BASE_PROPERTIES_ACTIONS.IMPORT_BASE_PROPERTIES) {
        return { ...payload }
    }
    else {
        return state;
    }
};



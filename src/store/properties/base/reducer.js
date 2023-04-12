import { defaultStoreData } from "../../../data/DefaultStoreData";
import { mockStoreData } from "../../../data/MockStreData";
import { ROOT_NODE_ID, getBaseProperties } from "../../../data/StoreData";
import { BASE_PROPERTIES_ACTIONS } from "./actionTypes";

/**
 * @typedef {{
 * position: { x: number; y: number; };
 * scale: { x: number; y: number; };
 * rotation: number;
 * }} IBaseProperties;
 */

/**
 * @typedef {{ nodeID: number; } & Partial<IBaseProperties>} IActionPayload 
 */


/**
 * @typedef {{ [nodeID: number]: IBaseProperties }} IBasePropertiesListState;
 */


/**
 * By default the root node has the base properties
 * @typeof IBasePropertiesListState
 */
// const STATE = defaultStoreData.properties.base;
const STATE = mockStoreData.properties.base;

/**
 * 
 * @param {IBasePropertiesListState} state 
 * @param {{type: string; payload: IActionPayload}} data 
 * @returns {IBasePropertiesListState}
 */
export const basePropertiesListReducer = (state = STATE, { type, payload }) => {
    switch (type) {
        case BASE_PROPERTIES_ACTIONS.UPDATE_BASE_PROPERTIES:
            const { nodeID, ...properties } = payload;
            const newState = { ...state };
            const newNodeProps = { ...newState[nodeID], ...properties };
            newState[nodeID] = newNodeProps;
            return newState;

        default: return state;
    }
};



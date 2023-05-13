import { defaultStoreData } from "../../../data/DefaultStoreData";
import { mockStoreData } from "../../../data/MockStreData";
import { getTextProperties } from "../../../data/StoreData";
import { TEXT_PROPERTIES_ACTIONS } from "./actionTypes";

/**
 * @typedef {{ nodeID: number;} & {properties: import("../../../data/StoreData").ITextProperties}} IActionPayload 
 */

/**
 * @typedef {{ [nodeID: number]: import("../../../data/StoreData").ITextProperties }} ITextPropertiesListState;
 */


/**
 * @typeof ITextPropertiesListState
 * 
 */
const STATE = defaultStoreData.properties.text;
// const STATE = mockStoreData.properties.text;

/**
 * 
 * @param {ITextPropertiesListState} state 
 * @param {{type: string; payload: { nodeID: id } | IActionPayload | ITextPropertiesListState}} data 
 * @returns {ITextPropertiesListState}
 */
export const textPropertiesListReducer = (state = STATE, { type, payload }) => {
    if (type === TEXT_PROPERTIES_ACTIONS.INIT_TEXT_PROPERTIES) {
        return { ...state, [payload.nodeID]: getTextProperties() };
    }
    else if (type === TEXT_PROPERTIES_ACTIONS.REMOVE_TEXT_PROPERTIES) {
        const newState = { ...state };
        delete newState[payload.nodeID];
        return newState;
    }
    else if (type === TEXT_PROPERTIES_ACTIONS.UPDATE_TEXT_PROPERTIES) {
        const newState = { ...state };
        newState[payload.nodeID] = payload.properties;
        return newState;
    }
    else if (type === TEXT_PROPERTIES_ACTIONS.IMPORT_TEXT_PROPERTIES) {
        return { ...payload }
    }
    else {
        return state;
    }
};



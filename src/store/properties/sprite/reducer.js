import { defaultStoreData } from "../../../data/DefaultStoreData";
import { mockStoreData } from "../../../data/MockStreData";
import { getSpriteProperties } from "../../../data/StoreData";
import { SPRITE_PROPERTIES_ACTIONS } from "./actionTypes";


/**
 * @typedef {{ nodeID: number;} & { properties: Partial<import("../../../data/StoreData").ISpriteProperties>}} IActionPayload 
 */


/**
 * @typedef {{ [nodeID: number]: import("../../../data/StoreData").ISpriteProperties }} ISpritePropertiesListState;
 */


/**
 * @typeof ISpritePropertiesListState
 */
const STATE = defaultStoreData.properties.sprite;
// const STATE = mockStoreData.properties.sprite;

/**
 * 
 * @param {ISpritePropertiesListState} state 
 * @param {{type: string; payload: { nodeID: id } | IActionPayload | ISpritePropertiesListState}} data 
 * @returns {ISpritePropertiesListState}
 */
export const spritePropertiesListReducer = (state = STATE, { type, payload }) => {
    if (type === SPRITE_PROPERTIES_ACTIONS.INIT_SPRITE_PROPERTIES) {
        const newState = { ...state, [payload.nodeID]: getSpriteProperties() };
        return newState;
    }
    else if (type === SPRITE_PROPERTIES_ACTIONS.REMOVE_SPRITE_PROPERTIES) {
        const newState = { ...state };
        delete newState[payload.nodeID];
        return newState;
    }
    else if (type === SPRITE_PROPERTIES_ACTIONS.UPDATE_SPRITE_PROPERTIES) {
        const { nodeID, properties } = payload;
        const newState = { ...state };
        const newNodeProps = { ...newState[nodeID], ...properties };
        newState[nodeID] = newNodeProps;
        return newState;
    }
    else if (type === SPRITE_PROPERTIES_ACTIONS.IMPORT_SPRITE_PROPERTIES) {
        return { ...payload }
    }
    else {
        return state;
    }

};



import { ROOT_NODE_ID, getNodeProperties } from "../../data/StoreData";
import { ENTITY_TYPES_LIST_ACTIONS } from "./actionTypes";

export const AVAILABLE_PROPERTIES_LIST = {
    BASE: "BASE",
    SPRITE: "SPRITE"
};

export const ENTITY_TYPES = {
    CONTAINER: "CONTAINER",
    SPRITE: "SPRITE"
}

/**
 * @typedef {{ nodeID: number; property: keyof AVAILABLE_PROPERTIES_LIST; }} IActionPayload 
 */

/**
 * @typedef {{ [nodeID: number]: {type: keyof ENTITY_TYPES, properties: string[] } }} IEntityTypesListState;
 */


/**
 * @typeof IEntityTypesListState
 */
const STATE = { ...getNodeProperties(ROOT_NODE_ID, [AVAILABLE_PROPERTIES_LIST.BASE]) };

/**
 * 
 * @param {IEntityTypesListState} state 
 * @param {{type: string; payload: IActionPayload}} data 
 * @returns {IEntityTypesListState}
 */
export const entityTypesListReducer = (state = STATE, { type, payload }) => {

    if (type === ENTITY_TYPES_LIST_ACTIONS.INIT_CONTAINER_ENTITY) {
        const newState = { ...state };
        newState[payload.nodeID] = {
            type: ENTITY_TYPES.CONTAINER,
            properties: [AVAILABLE_PROPERTIES_LIST.BASE]
        };
        return newState;
    }
    else if (type === ENTITY_TYPES_LIST_ACTIONS.INIT_SPRITE_ENTITY) {
        const newState = { ...state };
        newState[payload.nodeID] = {
            type: ENTITY_TYPES.SPRITE,
            properties: [AVAILABLE_PROPERTIES_LIST.BASE, AVAILABLE_PROPERTIES_LIST.SPRITE]
        };
        return newState;
    }
    else if (type === ENTITY_TYPES_LIST_ACTIONS.REMOVE_ENTITY) {
        const newState = { ...state };
        delete newState[payload.nodeID];
        return newState;
    }
    else if (type === ENTITY_TYPES_LIST_ACTIONS.ADD_EXTRA_ENTITY_PROPS) {
        const newState = { ...state };
        newState[payload.nodeID].properties.push(payload.property);
        return newState;
    }
    else if (type === ENTITY_TYPES_LIST_ACTIONS.REMOVE_EXTRA_ENTITY_PROPS) {
        const newState = { ...state };
        newState[payload.nodeID].properties = newState[payload.nodeID].properties
            .filter(val => val !== payload.property);
        return newState;
    }
    else {
        return state;
    }
};
import { defaultStoreData } from "../../data/DefaultStoreData";
import { mockStoreData } from "../../data/MockStreData";
import { AVAILABLE_PROPERTIES_LIST, ENTITY_TYPES, getEntityType } from "../../data/StoreData";
import { ENTITY_TYPES_LIST_ACTIONS } from "./actionTypes";

/**
 * @typedef {{ nodeID: number; property: keyof AVAILABLE_PROPERTIES_LIST; }} IActionPayload 
 */

/**
 * @typedef {{ [nodeID: number]: {type: keyof ENTITY_TYPES, properties: string[] } }} IEntityTypesListState;
 */


/**
 * @typeof IEntityTypesListState
 */
// const STATE = defaultStoreData.entitiesList;
const STATE = mockStoreData.entitiesList;

/**
 * 
 * @param {IEntityTypesListState} state 
 * @param {{type: string; payload: IActionPayload}} data 
 * @returns {IEntityTypesListState}
 */
export const entityTypesListReducer = (state = STATE, { type, payload }) => {

    if (type === ENTITY_TYPES_LIST_ACTIONS.INIT_CONTAINER_ENTITY) {
        const newState = {
            ...state,
            ...getEntityType(payload.nodeID, ENTITY_TYPES.CONTAINER, [AVAILABLE_PROPERTIES_LIST.BASE])
        };
        return newState;
    }
    else if (type === ENTITY_TYPES_LIST_ACTIONS.INIT_SPRITE_ENTITY) {
        const newState = {
            ...state,
            ...getEntityType(payload.nodeID, ENTITY_TYPES.SPRITE, [AVAILABLE_PROPERTIES_LIST.BASE, AVAILABLE_PROPERTIES_LIST.SPRITE])
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
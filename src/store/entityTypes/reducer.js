import { defaultStoreData } from "../../data/DefaultStoreData";
import { mockStoreData } from "../../data/MockStreData";
import { ENTITY_TYPES, getEntityType } from "../../data/StoreData";
import { ENTITY_TYPES_LIST_ACTIONS } from "./actionTypes";

/**
 * @typedef {{nodeID: number; entityType: ENTITY_TYPES[keyof ENTITY_TYPES]}} IActionPayload 
 */

/**
 * @typedef {{ [nodeID: number]: import("../../data/StoreData").IEntityData }} IEntityTypesListState;
 */


/**
 * @typeof IEntityTypesListState
 */
const STATE = defaultStoreData.entitiesList;
// const STATE = mockStoreData.entitiesList;

/**
 * 
 * @param {IEntityTypesListState} state 
 * @param {{type: string; payload: {nodeID: id} | IActionPayload | }} data 
 * @returns {IEntityTypesListState}
 */
export const entityTypesListReducer = (state = STATE, { type, payload }) => {

    if (type === ENTITY_TYPES_LIST_ACTIONS.INIT_ENTITY) {
        return { ...state, [payload.nodeID]: getEntityType(payload.entityType, []) };
    }
    else if (type === ENTITY_TYPES_LIST_ACTIONS.IMPORT_ENTITY_DATA) {
        return { ...payload };
    }
    else if (type === ENTITY_TYPES_LIST_ACTIONS.REMOVE_ENTITY) {
        const newState = { ...state };
        delete newState[payload.nodeID];
        return newState;
    }
    // I haven't decided if the editor will support some extra COMPONENTS like collision  box or mask etc

    // else if (type === ENTITY_TYPES_LIST_ACTIONS.ADD_EXTRA_ENTITY_COMPONENTS) {
    //     const newState = { ...state };
    //     newState[payload.nodeID].properties.push(payload.property);
    //     return newState;
    // }
    // else if (type === ENTITY_TYPES_LIST_ACTIONS.REMOVE_EXTRA_ENTITY_COMPONENTS) {
    //     const newState = { ...state };
    //     newState[payload.nodeID].properties = newState[payload.nodeID].properties
    //         .filter(val => val !== payload.property);
    //     return newState;
    // }
    else {
        return state;
    }
};
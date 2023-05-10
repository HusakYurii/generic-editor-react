import { ENTITY_TYPES } from "../../data/StoreData";
import { ENTITY_TYPES_LIST_ACTIONS } from "./actionTypes"


/**
 * @param {number} id 
 * @param {ENTITY_TYPES[keyof ENTITY_TYPES]} entityType 
 */
export const initEntityAction = (id, entityType) => {
    return {type: ENTITY_TYPES_LIST_ACTIONS.INIT_ENTITY, payload: {nodeID: id, entityType}};
}

/**
 * @param {number} id 
 */
export const removeEntityAction = (id) => {
    return { type: ENTITY_TYPES_LIST_ACTIONS.REMOVE_ENTITY, payload: {nodeID: id} }
};

/**
 * @param {import ("./reducer").IEntityTypesListState} payload 
 */
export const importEntityDataAction = (payload) => {
    return { type: ENTITY_TYPES_LIST_ACTIONS.IMPORT_ENTITY_DATA, payload }
};

// I haven't decided if the editor will support some extra props like collision  box or mask etc
   

// /**
//  * 
//  */
// export const addEntityPropsAction = (payload) => {
//     return { type: ENTITY_TYPES_LIST_ACTIONS.ADD_EXTRA_ENTITY_COMPONENTS, payload }
// };

// /**
//  * 
//  */
// export const removeEntityPropsAction = (payload) => {
//     return { type: ENTITY_TYPES_LIST_ACTIONS.REMOVE_EXTRA_ENTITY_COMPONENTS, payload }
// };
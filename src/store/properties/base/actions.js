import { BASE_PROPERTIES_ACTIONS } from "./actionTypes"

/**
 * @param {number} id 
 */
export const initBasePropertiesAction = (id) => {
    return { type: BASE_PROPERTIES_ACTIONS.INIT_BASE_PROPERTIES, payload: { nodeID: id } }
};

/**
 * @param {number} id 
 */
export const removeBasePropertiesAction = (id) => {
    return { type: BASE_PROPERTIES_ACTIONS.REMOVE_BASE_PROPERTIES, payload: { nodeID: id } }
};

/**
 * @param {import("./reducer").IActionPayload} payload 
 */
export const updateBasePropertiesAction = (payload) => {
    return { type: BASE_PROPERTIES_ACTIONS.UPDATE_BASE_PROPERTIES, payload }
};

/**
 * @param {import("./reducer").IBasePropertiesListState} payload 
 */
export const importBasePropertiesAction = (payload) => {
    return { type: BASE_PROPERTIES_ACTIONS.IMPORT_BASE_PROPERTIES, payload }
};
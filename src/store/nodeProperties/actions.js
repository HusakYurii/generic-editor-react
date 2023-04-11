import { NODE_PROPERTIES_LIST_ACTIONS } from "./actionTypes"

/**
 * @param {import("./reducer").IActionPayload} payload 
 */
export const initPropertiesAction = (payload) => {
    return { type: NODE_PROPERTIES_LIST_ACTIONS.INIT_NODE_PROPERTIES, payload }
};

/**
 * @param {import("./reducer").IActionPayload} payload 
 */
export const addPropertyAction = (payload) => {
    return { type: NODE_PROPERTIES_LIST_ACTIONS.ADD_NODE_PROPERTY, payload }
};

/**
 * @param {import("./reducer").IActionPayload} payload 
 */
export const removePropertyAction = (payload) => {
    return { type: NODE_PROPERTIES_LIST_ACTIONS.REMOVE_NODE_PROPERTY, payload }
};
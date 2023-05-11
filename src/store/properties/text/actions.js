import { TEXT_PROPERTIES_ACTIONS } from "./actionTypes"

/**
 * @param {number} id
 */
export const initTextPropertiesAction = (id) => {
    return { type: TEXT_PROPERTIES_ACTIONS.INIT_TEXT_PROPERTIES, payload: { nodeID: id } }
};

/**
 * @param {number} id
 */
export const removeTextPropertiesAction = (id) => {
    return { type: TEXT_PROPERTIES_ACTIONS.REMOVE_TEXT_PROPERTIES, payload: { nodeID: id } }
};

/**
 * @param {import("./reducer").IActionPayload} payload
 */
export const updateTextPropertiesAction = (payload) => {
    return { type: TEXT_PROPERTIES_ACTIONS.UPDATE_TEXT_PROPERTIES, payload }
};

/**
 * @param {import("./reducer").ITextPropertiesListState} payload
 */
export const importTextPropertiesAction = (payload) => {
    return { type: TEXT_PROPERTIES_ACTIONS.IMPORT_TEXT_PROPERTIES, payload }
};
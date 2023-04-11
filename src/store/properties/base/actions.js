import { BASE_PROPERTIES_ACTIONS } from "./actionTypes"

/**
 * @param {import("./reducer").IActionPayload} payload 
 */
export const updateBasePropertiesAction = (payload) => {
    return { type: BASE_PROPERTIES_ACTIONS.UPDATE_BASE_PROPERTIES, payload }
};
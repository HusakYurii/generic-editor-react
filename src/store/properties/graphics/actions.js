import { GRAPHICS_TYPES } from "../../../data/StoreData";
import { GRAPHICS_PROPERTIES_ACTIONS } from "./actionTypes";

/**
 * @param {number} id 
 * @param {keyof GRAPHICS_TYPES} type
 */
export const initGraphicsPropertiesAction = (id, type) => {
    return { type: GRAPHICS_PROPERTIES_ACTIONS.INIT_GRAPHICS_PROPERTIES, payload: { nodeID: id, type } }
};

/**
 * @param {number} id 
 */
export const removeGraphicsPropertiesAction = (id) => {
    return { type: GRAPHICS_PROPERTIES_ACTIONS.REMOVE_GRAPHICS_PROPERTIES, payload: { nodeID: id } }
};

/**
 * @param {import("./reducer").IUpdateActionPayload} payload 
 */
export const updateGraphicsPropertiesAction = (payload) => {
    return { type: GRAPHICS_PROPERTIES_ACTIONS.UPDATE_GRAPHICS_PROPERTIES, payload }
};

/**
 * @param {import("./reducer").IGraphicsPropertiesListState} payload 
 */
export const importGraphicsPropertiesAction = (payload) => {
    return { type: GRAPHICS_PROPERTIES_ACTIONS.IMPORT_GRAPHICS_PROPERTIES, payload }
};
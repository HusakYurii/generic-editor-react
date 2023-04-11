import { NODE_PROPERTIES_ACTIONS } from "./nodePropertiesActionTypes"

/**
 * @param {import("./nodesPropertiesReducer").ActionPayload} payload 
 */
export const updateNodeBasePropertiesActions = (payload) => {
    return { type: NODE_PROPERTIES_ACTIONS.UPDATE_NODE_BASE_PROPERTIES, payload }
};

/**
 * @param {import("./nodesSpritePropertiesReducer").ActionPayload} payload 
 */
export const updateNodeSpritePropertiesActions = (payload) => {
    return { type: NODE_PROPERTIES_ACTIONS.UPDATE_NODE_SPRITE_PROPERTIES, payload }
};
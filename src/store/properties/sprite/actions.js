import { SPRITE_PROPERTIES_ACTIONS } from "./actionTypes"

/**
 * @param {number} id
 */
export const initSpritePropertiesAction = (id) => {
    return { type: SPRITE_PROPERTIES_ACTIONS.INIT_SPRITE_PROPERTIES, payload: { nodeID: id } }
};

/**
 * @param {number} id
 */
export const removeSpritePropertiesAction = (id) => {
    return { type: SPRITE_PROPERTIES_ACTIONS.REMOVE_SPRITE_PROPERTIES, payload: { nodeID: id } }
};

/**
 * @param {import("./reducer").IActionPayload} payload
 */
export const updateSpritePropertiesAction = (payload) => {
    return { type: SPRITE_PROPERTIES_ACTIONS.UPDATE_SPRITE_PROPERTIES, payload }
};

/**
 * @param {import("./reducer").ISpritePropertiesListState} payload
 */
export const importSpritePropertiesAction = (payload) => {
    return { type: SPRITE_PROPERTIES_ACTIONS.IMPORT_SPRITE_PROPERTIES, payload }
};
import { SPRITE_PROPERTIES_ACTIONS } from "./actionTypes"

/**
 * @param {import("./reducer").IActionPayload} payload
 */
export const updateSpritePropertiesAction = (payload) => {
    return { type: SPRITE_PROPERTIES_ACTIONS.UPDATE_SPRITE_PROPERTIES, payload }
};
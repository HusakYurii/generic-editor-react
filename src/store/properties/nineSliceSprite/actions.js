import { NINE_SLICE_SPRITE_PROPERTIES_ACTIONS } from "./actionTypes"

/**
 * @param {number} id
 */
export const initNineSliceSpritePropertiesAction = (id) => {
    return { type: NINE_SLICE_SPRITE_PROPERTIES_ACTIONS.INIT_NINE_SLICE_SPRITE_PROPERTIES, payload: { nodeID: id } }
};

/**
 * @param {number} id
 */
export const removeNineSliceSpritePropertiesAction = (id) => {
    return { type: NINE_SLICE_SPRITE_PROPERTIES_ACTIONS.REMOVE_NINE_SLICE_SPRITE_PROPERTIES, payload: { nodeID: id } }
};

/**
 * @param {import("./reducer").IActionPayload} payload
 */
export const updateNineSliceSpritePropertiesAction = (payload) => {
    return { type: NINE_SLICE_SPRITE_PROPERTIES_ACTIONS.UPDATE_NINE_SLICE_SPRITE_PROPERTIES, payload }
};

/**
 * @param {import("./reducer").INineSliceSpritePropertiesListState} payload
 */
export const importNineSliceSpritePropertiesAction = (payload) => {
    return { type: NINE_SLICE_SPRITE_PROPERTIES_ACTIONS.IMPORT_NINE_SLICE_SPRITE_PROPERTIES, payload }
};
import { ENTITY_TYPES_LIST_ACTIONS } from "./actionTypes"


/**
 * @param {number} id 
 */
export const initContainerEntityAction = (id) => {
    return { type: ENTITY_TYPES_LIST_ACTIONS.INIT_CONTAINER_ENTITY, payload: { nodeID: id } }
};

/**
 * @param {number} id 
 */
export const initSpriteEntityAction = (id) => {
    return { type: ENTITY_TYPES_LIST_ACTIONS.INIT_SPRITE_ENTITY, payload: { nodeID: id } }
};

/**
 * @param {import("./reducer").IActionPayload} payload 
 */
export const removeEntityAction = (payload) => {
    return { type: ENTITY_TYPES_LIST_ACTIONS.REMOVE_ENTITY, payload }
};

/**
 * @param {import("./reducer").IActionPayload} payload 
 */
export const addEntityPropsAction = (payload) => {
    return { type: ENTITY_TYPES_LIST_ACTIONS.ADD_EXTRA_ENTITY_PROPS, payload }
};

/**
 * @param {import("./reducer").IActionPayload} payload 
 */
export const removeEntityPropsAction = (payload) => {
    return { type: ENTITY_TYPES_LIST_ACTIONS.REMOVE_EXTRA_ENTITY_PROPS, payload }
};
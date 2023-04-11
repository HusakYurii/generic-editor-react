import { SPRITE_PROPERTIES_ACTIONS } from "./actionTypes";

/**
 * @typedef {{
 * anchor: { x: number; y: number; }
 * textureName: string;
 * }} ISpriteProperties;
 */

/**
 * @typedef {{ nodeID: number;} & Partial<ISpriteProperties>} IActionPayload 
 */


/**
 * @typedef {{ [nodeID: number]: ISpriteProperties }} ISpritePropertiesListState;
 */


/**
 * @typeof ISpritePropertiesListState
 */
const STATE = {};

/**
 * 
 * @param {ISpritePropertiesListState} state 
 * @param {{type: string; payload: IActionPayload}} data 
 * @returns {ISpritePropertiesListState}
 */
export const spritePropertiesListReducer = (state = STATE, { type, payload }) => {
    switch (type) {
        case SPRITE_PROPERTIES_ACTIONS.UPDATE_SPRITE_PROPERTIES:
            const { nodeID, ...properties } = payload;
            const newState = { ...state };
            const newNodeProps = { ...newState[nodeID], ...properties };
            newState[nodeID] = newNodeProps;
            return newState;

        default: return state;
    }
};



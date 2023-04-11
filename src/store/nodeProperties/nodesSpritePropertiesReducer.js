import { getRootNodeSpriteProperties } from "../defaultStoreData";
import { NODE_PROPERTIES_ACTIONS } from "./nodePropertiesActionTypes";

/**
 * @typedef {{
 * anchor: { x: number; y: number; }
 * textureName: string;
 * }} NodesSpriteProperties;
 */

/**
 * @typedef {NodesSpriteProperties & {
 * nodeID: number;
 * }} ActionPayload 
 */


/**
 * @typedef {{
 * [nodeID: number]: NodesSpriteProperties
 * }} NodesSpritePropertiesListState;
 */


/**
 * @typeof NodesSpritePropertiesListState
 */
const NODES_SPRITE_PROPERTIES_LIST = getRootNodeSpriteProperties();

/**
 * 
 * @param {NodesSpritePropertiesListState} state 
 * @param {{type: string; payload: ActionPayload}} data 
 * @returns {NodesSpritePropertiesListState}
 */
export const nodesSpritePropertiesListReducer = (state = NODES_SPRITE_PROPERTIES_LIST, { type, payload }) => {
    switch (type) {
        case NODE_PROPERTIES_ACTIONS.UPDATE_NODE_SPRITE_PROPERTIES:
            const { nodeID, ...properties } = payload;
            const newState = { ...state };
            const newNodeProps = { ...newState[nodeID], ...properties };
            newState[nodeID] = newNodeProps;
            return newState;

        default: return state;
    }
};



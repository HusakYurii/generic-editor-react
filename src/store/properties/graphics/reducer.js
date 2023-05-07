import { defaultStoreData } from "../../../data/DefaultStoreData";
import { mockStoreData } from "../../../data/MockStreData";
import { GRAPHICS_TYPES, getBaseProperties, getGraphicsProperties } from "../../../data/StoreData";
import { GRAPHICS_PROPERTIES_ACTIONS } from "./actionTypes";



/**
 * @typedef {{
* nodeID: number;
* type: keyof GRAPHICS_TYPES;
* }} IInitActionPayload; 
*/

/**
 * @typedef {{
* nodeID: number;
* type: keyof GRAPHICS_TYPES;
* }} IChangeTypeActionPayload; 
*/

/**
 * @typedef {{
 * nodeID: number;
 * properties: import("../../../data/StoreData").IGraphicsPropertiesCombination;
 * }} IUpdateActionPayload; 
 */

/**
 * @typedef {{
*  nodeID: number;
* }} IRemoveActionPayload; 
*/

/**
 * @typedef {{
 * type: keyof GRAPHICS_TYPES;
 * properties: import("../../../data/StoreData").IGraphicsPropertiesCombination;
 * }} IGraphicsData 
 */

/**
 * @typedef {{ [nodeID: number]: IGraphicsData }} IGraphicsPropertiesListState;
 */


/**
 * By default the root node has the base properties
 * @typeof IGraphicsPropertiesListState
 */
const STATE = defaultStoreData.properties.graphics;
// const STATE = mockStoreData.properties.graphics;

/**
 * 
 * @param {IGraphicsPropertiesListState} state 
 * @param {{type: string;} & (IUpdateActionPayload | IInitActionPayload | IRemoveActionPayload | IChangeTypeActionPayload) } data 
 * @returns {IGraphicsPropertiesListState}
 */
export const graphicsPropertiesListReducer = (state = STATE, { type, payload }) => {
    if (type === GRAPHICS_PROPERTIES_ACTIONS.INIT_GRAPHICS_PROPERTIES) {
        return { ...state, [payload.nodeID]: { type: payload.type, ...getGraphicsProperties(payload.type) } };
    }
    else if (type === GRAPHICS_PROPERTIES_ACTIONS.CHANGE_GRAPHICS_TYPE) {
        // because I will use the same id, it will replace the properties for a new type
        return { ...state, [payload.nodeID]: { type: payload.type, ...getGraphicsProperties(payload.type) } };
    }
    else if (type === GRAPHICS_PROPERTIES_ACTIONS.REMOVE_GRAPHICS_PROPERTIES) {
        const newState = { ...state };
        delete newState[payload.nodeID];
        return newState;
    }

    else if (type === GRAPHICS_PROPERTIES_ACTIONS.UPDATE_GRAPHICS_PROPERTIES) {
        const { nodeID, properties } = payload;
        const newState = { ...state };
        const newNodeProps = { ...newState[nodeID], ...properties };
        newState[nodeID] = newNodeProps;
        return newState;
    }

    else if (type === GRAPHICS_PROPERTIES_ACTIONS.IMPORT_GRAPHICS_PROPERTIES) {
        return { ...payload }
    }
    else {
        return state;
    }
};



import { RESOURCE_ACTIONS } from "./actionTypes";

/**
 * @typedef {{ [id: number]: File }} IResourcesListState;
 */

/**
 * @typeof IResourcesListState
 */
const STATE = {};

/**
 * 
 * @param {IResourcesListState} state 
 * @param {{type: string; payload: {id: number; file: File} | Array<{id: number, file: File}}} data 
 * @returns {IResourcesListState}
 */
export const resourcesListReducer = (state = STATE, { type, payload }) => {
    if (type === RESOURCE_ACTIONS.ADD_RESOURCES) {
        const newState = { ...state };
        payload.forEach(({ id, file }) => newState[id] = file);
        return newState;
    }

    else if (type === RESOURCE_ACTIONS.REMOVE_RESOURCE) {
        const newState = { ...state };
        delete newState[payload.id];
        return newState;
    }

    else if (type === RESOURCE_ACTIONS.IMPORT_RESOURCES) {
        return { ...payload };
    }

    else {
        return state;
    }
};



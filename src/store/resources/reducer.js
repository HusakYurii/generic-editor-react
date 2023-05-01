import { RESOURCE_ACTIONS } from "./actionTypes";

/**
 * @typedef {{ [id: number]: File }} IResourcesListState;
 */

/**
 * @typeof IResourcesListState
 */
const STATE = {};

export const onResourceAddMiddlewares = [];
export const onResourceRemoveMiddlewares = [];

/**
 * 
 * @param {IResourcesListState} state 
 * @param {{type: string; payload: {id: number; file: File}}} data 
 * @returns {IResourcesListState}
 */
export const resourcesListReducer = (state = STATE, { type, payload }) => {
    if (type === RESOURCE_ACTIONS.ADD_RESOURCE) {
        const newState = { ...state };
        newState[payload.id] = payload.file;
        onResourceAddMiddlewares.forEach(middleware => middleware(payload.file));
        return newState;
    }

    else if (type === RESOURCE_ACTIONS.REMOVE_RESOURCE) {
        const newState = { ...state };
        const file = newState[payload.id];
        delete newState[payload.id];
        onResourceRemoveMiddlewares.forEach(middleware => middleware(file));
        return newState;
    }

    else if (type === RESOURCE_ACTIONS.IMPORT_RESOURCES) {
        Object.values(payload)
            .forEach(file => onResourceAddMiddlewares.forEach(middleware => middleware(file)))
        return { ...payload };
    }

    else {
        return state;
    }
};



import { RESOURCE_ACTIONS } from "./actionTypes"

/**
 * @param {number} id 
 * @param {File} file 
 */
export const addResourceAction = (id, file) => {
    return { type: RESOURCE_ACTIONS.ADD_RESOURCE, payload: { id, file } }
};

/**
 * @param {number} id 
 */
export const removeResourceAction = (id) => {
    return { type: RESOURCE_ACTIONS.REMOVE_RESOURCE, payload: { id } }
};

/**
 * @param {import("./reducer").IResourcesListState} payload 
 */
export const importResourcesAction = (payload) => {
    return { type: RESOURCE_ACTIONS.IMPORT_RESOURCES, payload }
};
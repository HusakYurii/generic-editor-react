import { RESOURCE_ACTIONS } from "./actionTypes"

/**
 * @param {Array<{id: number, file: File}} payload
 */
export const addResourceAction = (payload) => {
    return { type: RESOURCE_ACTIONS.ADD_RESOURCES, payload }
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
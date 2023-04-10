import { NODE_PROPERTIES_ACTIONS } from "./nodePropertiesActionTypes"

export const updateNodeBasePropertiesActions = (payload) => {
    return { type: NODE_PROPERTIES_ACTIONS.UPDATE_NODE_BASE_PROPERTIES, payload }
};
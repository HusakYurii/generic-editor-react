import { createNode } from "./NodeData";
import { AVAILABLE_PROPERTIES_LIST, ENTITY_TYPES, ROOT_NODE_ID, getBaseProperties, getEntityType } from "./StoreData";

/* 
    By default, (for new projects) 
    We have a rood node in the tree which is an entity type of container and, thus, has base properties
*/
export const defaultStoreData = {
    tree: {
        treeData: createNode(ROOT_NODE_ID, "RootNode", []),
        selectedNodeID: null
    },
    entitiesList: {
        ...getEntityType(ROOT_NODE_ID, ENTITY_TYPES.CONTAINER, [AVAILABLE_PROPERTIES_LIST.BASE])
    },
    properties: {
        base: {
            ...getBaseProperties(ROOT_NODE_ID)
        },
        sprite: {}
    }
}
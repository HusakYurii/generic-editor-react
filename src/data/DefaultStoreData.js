import { createNode } from "./NodeData";
import { ENTITY_TYPES, ROOT_NODE_ID, getBaseProperties, getEntityType } from "./StoreData";

/* 
    By default, (for new projects) 
    We have a rood node in the tree which is an entity type of container and, thus, has base properties
*/
export const defaultStoreData = {
    tree: {
        treeData: createNode(ROOT_NODE_ID, "Scene", []),
        selectedNodeID: null
    },
    entitiesList: {
        [ROOT_NODE_ID]: getEntityType(ENTITY_TYPES.CONTAINER, [])
    },
    properties: {
        base: {
            [ROOT_NODE_ID]: getBaseProperties()
        },
        sprite: {},
        nineSliceSprite: {},
        graphics: {}
    }
}
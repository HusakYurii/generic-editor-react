import { createNode } from "./NodeData";
import { AVAILABLE_PROPERTIES_LIST, ENTITY_TYPES, ROOT_NODE_ID, getBaseProperties, getEntityType, getSpriteProperties } from "./StoreData";

export const mockStoreData = {
    tree: {
        treeData: createNode(ROOT_NODE_ID, "RootNode", [
            createNode(123, "Header", [
                createNode(645, "LogoSprite", []),
            ]),
            createNode(222, "Footer", [

            ])
        ]),
        selectedNodeID: null
    },
    entitiesList: {
        ...getEntityType(ROOT_NODE_ID, ENTITY_TYPES.CONTAINER, []),
        ...getEntityType(123, ENTITY_TYPES.CONTAINER, []),
        ...getEntityType(222, ENTITY_TYPES.CONTAINER, []),
        ...getEntityType(645, ENTITY_TYPES.SPRITE, []),
    },
    properties: {
        base: {
            ...getBaseProperties(ROOT_NODE_ID),
            ...getBaseProperties(123),
            ...getBaseProperties(222),
            ...getBaseProperties(645),
        },
        sprite: {
            ...getSpriteProperties(645)
        }
    }
}
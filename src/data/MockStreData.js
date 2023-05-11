import { createNode } from "./NodeData";
import { ENTITY_TYPES, ROOT_NODE_ID, getBaseProperties, getEntityType, getSpriteProperties } from "./StoreData";

export const mockStoreData = {
    tree: {
        treeData: createNode(ROOT_NODE_ID, "Scene", [
            createNode(123, "Header", [
                createNode(645, "LogoSprite", []),
            ]),
            createNode(222, "Footer", [

            ])
        ]),
        selectedNodeID: null
    },
    entitiesList: {
        [ROOT_NODE_ID]: getEntityType(ENTITY_TYPES.CONTAINER, []),
        [123]: getEntityType(ENTITY_TYPES.CONTAINER, []),
        [222]: getEntityType(ENTITY_TYPES.CONTAINER, []),
        [645]: getEntityType(ENTITY_TYPES.SPRITE, []),
    },
    properties: {
        base: {
            [ROOT_NODE_ID]: getBaseProperties(),
            [123]: getBaseProperties(),
            [222]: getBaseProperties(),
            [645]: getBaseProperties(),
        },
        sprite: {
            ...getSpriteProperties(645)
        },
        nineSliceSprite: {

        },
        graphics: {

        },
        text: {

        }
    }
}
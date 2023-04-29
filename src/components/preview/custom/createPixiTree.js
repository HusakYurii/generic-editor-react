import React from "react";
import { ENTITY_TYPES } from "../../../data/StoreData";
import { CContainer } from "./CContainer";
import { CSprite } from "./CSprite";
import { Texture } from "pixi.js";

/**
 *
 * @param {import("../../../data/NodeData").INodeData} nodeData
 * @param {import("../../../store/properties/base").IBasePropertiesListState} basePropertiesList
 * @param {import("../../../store/properties/sprite").ISpritePropertiesListState} spritePropertiesList
 * @param {import("../../../store/entityTypes").IEntityTypesListState} entityTypesList
 * @param {import("../../../store/resources").IResourcesListState} resourcesList
 */
export const createPixiTree = (
    nodeData,
    basePropertiesList,
    spritePropertiesList,
    entityTypesList,
    resourcesList
) => {
    const entity = entityTypesList[nodeData.id];

    if (entity.type === ENTITY_TYPES.CONTAINER) {
        const { position, scale, rotation } = basePropertiesList[nodeData.id];
        return (
            <CContainer key={nodeData.id} {...{ position, scale, rotation }}>
                {nodeData.nodes.map((node) => createPixiTree(node, basePropertiesList, spritePropertiesList, entityTypesList, resourcesList))}
            </CContainer>
        );
    }
    if (entity.type === ENTITY_TYPES.SPRITE) {
        const { position, scale, rotation } = basePropertiesList[nodeData.id];
        const { anchor, resourceID } = spritePropertiesList[nodeData.id];
        const resource = resourcesList[resourceID];

        const texture = resource ? Texture.from(resource.name) : Texture.EMPTY;

        return (
            <CSprite key={nodeData.id} {...{ texture, position, scale, anchor, rotation }}>
                {nodeData.nodes.map((node) => createPixiTree(node, basePropertiesList, spritePropertiesList, entityTypesList, resourcesList))}
            </CSprite>
        );
    }
}
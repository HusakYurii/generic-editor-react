import React from "react";
import { ENTITY_TYPES } from "../../../data/StoreData";
import { CContainer } from "./CContainer";
import { CSprite } from "./CSprite";
import { CGraphics } from "./CGraphics";
import { Texture } from "pixi.js";

/**
 *
 * @param {import("../../../data/NodeData").INodeData} nodeData
 * @param {import("../../../store/properties/base").IBasePropertiesListState} basePropertiesList
 * @param {import("../../../store/properties/sprite").ISpritePropertiesListState} spritePropertiesList
 * @param {import("../../../store/entityTypes").IEntityTypesListState} entityTypesList
 * @param {import("../../../store/resources").IResourcesListState} resourcesList
 * @param {import("../../../store/properties/graphics").IGraphicsPropertiesListState} graphicsList
 */
export const createPixiTree = (nodeData, dependencies) => {
    const { basePropertiesList, spritePropertiesList, entityTypesList, resourcesList, graphicsList } = dependencies;

    const entity = entityTypesList[nodeData.id];

    const { position, scale, rotation } = basePropertiesList[nodeData.id];

    if (entity.type === ENTITY_TYPES.CONTAINER) {
        return (
            <CContainer key={nodeData.id} {...{ position, scale, rotation }}>
                {nodeData.nodes.map((node) => createPixiTree(node, dependencies))}
            </CContainer>
        );
    }
    if (entity.type === ENTITY_TYPES.SPRITE) {
        const { anchor, resourceID } = spritePropertiesList[nodeData.id];
        const resource = resourcesList[resourceID];

        const texture = resource ? Texture.from(resource.name) : Texture.EMPTY;

        return (
            <CSprite key={nodeData.id} {...{ texture, position, scale, anchor, rotation }}>
                {nodeData.nodes.map((node) => createPixiTree(node, dependencies))}
            </CSprite>
        );
    }
    if (entity.type === ENTITY_TYPES.GRAPHICS) {
        const { type, ...graphicsData } = graphicsList[nodeData.id];
        return (
            <CGraphics key={nodeData.id} {...{ position, scale, rotation, type, graphicsData }}>
                {nodeData.nodes.map((node) => createPixiTree(node, dependencies))}
            </CGraphics>
        );
    }
}
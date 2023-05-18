import React from "react";
import { ENTITY_TYPES } from "../../../data/StoreData";
import { CContainer } from "./CContainer";
import { CSprite } from "./CSprite";
import { CGraphics } from "./CGraphics";
import { CNineSlicePlane } from "./CNineSlicePlane";
import { Texture } from "pixi.js";
import { CText } from "./CText";

/**
 *
 * @param {import("../../../data/NodeData").INodeData} nodeData
 * @param {import("../../../store/properties/base").IBasePropertiesListState} basePropertiesList
 * @param {import("../../../store/properties/sprite").ISpritePropertiesListState} spritePropertiesList
 * @param {import("../../../store/properties/nineSliceSprite").INineSliceSpritePropertiesListState} nineSliceSpritePropertiesList
 * @param {import("../../../store/entityTypes").IEntityTypesListState} entityTypesList
 * @param {import("../../../store/resources").IResourcesListState} resourcesList
 * @param {import("../../../store/properties/graphics").IGraphicsPropertiesListState} graphicsList
 */
export const createPixiTree = (nodeData, dependencies) => {
    const {
        basePropertiesList,
        spritePropertiesList,
        entityTypesList,
        resourcesList,
        graphicsList,
        nineSliceSpritePropertiesList,
        textPropertiesList
    } = dependencies;

    const entity = entityTypesList[nodeData.id];
    const baseProps = basePropertiesList[nodeData.id];

    if (entity.type === ENTITY_TYPES.CONTAINER) {
        return (
            <CContainer key={nodeData.id} id={nodeData.id} {...baseProps}>
                {nodeData.nodes.map((node) => createPixiTree(node, dependencies))}
            </CContainer>
        );
    }
    if (entity.type === ENTITY_TYPES.SPRITE) {
        const spriteProps = spritePropertiesList[nodeData.id];
        const resource = resourcesList[spriteProps.resourceID];
        const texture = resource ? Texture.from(resource.name) : Texture.EMPTY;

        return (
            <CSprite key={nodeData.id} id={nodeData.id} {...{ texture, ...baseProps, ...spriteProps }}>
                {nodeData.nodes.map((node) => createPixiTree(node, dependencies))}
            </CSprite>
        );
    }
    if (entity.type === ENTITY_TYPES.GRAPHICS) {
        const graphicsProps = graphicsList[nodeData.id];
        return (
            <CGraphics key={nodeData.id} id={nodeData.id} {...{ ...baseProps, ...graphicsProps }}>
                {nodeData.nodes.map((node) => createPixiTree(node, dependencies))}
            </CGraphics>
        );
    }
    if (entity.type === ENTITY_TYPES.NINE_SLICE_SPRITE) {
        const nineSliceProps = nineSliceSpritePropertiesList[nodeData.id];
        const resource = resourcesList[nineSliceProps.resourceID];
        const texture = resource ? Texture.from(resource.name) : Texture.EMPTY;

        return (
            <CNineSlicePlane key={nodeData.id} id={nodeData.id} {...{ texture, ...baseProps, ...nineSliceProps }}>
                {nodeData.nodes.map((node) => createPixiTree(node, dependencies))}
            </CNineSlicePlane>
        );
    }
    if (entity.type === ENTITY_TYPES.TEXT) {
        const textProps = textPropertiesList[nodeData.id];

        return (
            <CText key={nodeData.id} id={nodeData.id} {...{ baseProps, textProps }}>
                {nodeData.nodes.map((node) => createPixiTree(node, dependencies))}
            </CText>
        );
    }
}
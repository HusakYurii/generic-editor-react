import React from "react";
import { connect } from "react-redux";
import { ENTITY_TYPES } from "../../data/StoreData";
import { Stage, Container, Sprite } from 'react-pixi-fiber';
import { utils, Texture } from "pixi.js";

// class ResizeController {
//     constructor(renderer, { width = 900, height = 900 } = {}) {

//         this._renderer = renderer;
//         this._designSize = { width, height };

//         this.currentSize = { width, height };
//         this.onResize = (currentSize) => { }
//     }

//     /**
//      * @param {{ width: number; height: number;}} newSizes 
//      */
//     resize(newSizes) {
//         const { width, height } = this._designSize;

//         const containerHeight = newSizes.height;
//         const containerWidth = newSizes.width;

//         const isPortrait = containerHeight > containerWidth;
//         const gameSize = { width: 0, height: 0 };

//         if (isPortrait) {
//             gameSize.width = width | 0;
//             gameSize.height = (height * (containerHeight / containerWidth)) | 0;
//         } else {
//             gameSize.height = height | 0;
//             gameSize.width = (width * (containerWidth / containerHeight)) | 0;
//         }

//         this._renderer.resize(gameSize.width, gameSize.height);
//         this._renderer.view.style.width = `${containerWidth}px`;
//         this._renderer.view.style.height = `${containerHeight}px`;

//         this.currentSize = gameSize;
//         this.onResize && this.onResize({ ...gameSize })
//     }
// }


/**
 * @typedef {{
 * treeData:  import("../../store/tree").ITreeState;
 * basePropertiesList: import("../../store/properties/base").IBasePropertiesListState;
 * spritePropertiesList: import("../../store/properties/sprite").ISpritePropertiesListState;
 * entityTypesList: import("../../store/entityTypes").IEntityTypesListState;
 * resourcesList: import("../../store/resources").IResourcesListState;
 * }} PreviewPanelComponentDependencies
 */


/**
 * @param { PreviewPanelComponentDependencies} props 
 */
const PreviewPanelComponent = ({
    tree,
    basePropertiesList,
    spritePropertiesList,
    entityTypesList,
    resourcesList
}) => {

    const createPixiTree = (nodeData) => {
        const entity = entityTypesList[nodeData.id];

        if (entity.type === ENTITY_TYPES.CONTAINER) {
            const { position, scale, rotation } = basePropertiesList[nodeData.id];
            return (
                <Container key={nodeData.id} x={position.x} y={position.y}>
                    {nodeData.nodes.map(createPixiTree)}
                </Container>
            );
        }
        if (entity.type === ENTITY_TYPES.SPRITE) {
            const { position, scale, rotation } = basePropertiesList[nodeData.id];
            const { anchor, resourceID } = spritePropertiesList[nodeData.id];
            const resource = resourcesList[resourceID];

            const texture = resource ? Texture.from(resource.name) : Texture.EMPTY;
            return (
                <Sprite key={nodeData.id} texture={texture} x={position.x} y={position.y}>
                    {nodeData.nodes.map(createPixiTree)}
                </Sprite>
            );
        }
    }

    return (
        <Stage options={{ backgroundColor: 0xc2c2c2 }}>
            {createPixiTree(tree.treeData)}
        </Stage>
    );
};

/**
 * @param {import("../../store").IStore} data 
 */
const mapStateToProps = ({ tree, resourcesList, basePropertiesList, spritePropertiesList, entityTypesList }) => {
    return {
        tree,
        basePropertiesList,
        spritePropertiesList,
        entityTypesList,
        resourcesList
    };
};


export const PreviewPanel = connect(
    mapStateToProps,
    {
    }
)(PreviewPanelComponent)
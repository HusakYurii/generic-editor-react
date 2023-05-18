import React from "react";
import { connect } from "react-redux";
import { createPixiTree } from "./custom/createPixiTree";

/**
 * @typedef {{
 * treeData: import("../../store/tree").ITreeState["treeData"];
 * basePropertiesList: import("../../store/properties/base").IBasePropertiesListState;
 * spritePropertiesList: import("../../store/properties/sprite").ISpritePropertiesListState;
 * nineSliceSpritePropertiesList: import("../../store/properties/nineSliceSprite").INineSliceSpritePropertiesListState;
 * graphicsList: import("../../store/properties/graphics").IGraphicsPropertiesListState;
 * textPropertiesList: import("../../store/properties/text").ITextPropertiesListState;
 * entityTypesList: import("../../store/entityTypes").IEntityTypesListState;
 * resourcesList: import("../../store/resources").IResourcesListState;
 * }} MainSceneComponentDependencies
 */

/**
 * @param { MainSceneComponentDependencies} props 
 */
const MainSceneComponent = ({ treeData, ...dependencies }) => {
    return (
        <>
            {treeData ? createPixiTree(treeData, dependencies) : null}
        </>
    );
};

/**
 * @param {import("../../store").IStore} store 
 */
const mapStateToProps = (store) => {
    return {
        treeData: store.tree.treeData,
        basePropertiesList: store.basePropertiesList,
        spritePropertiesList: store.spritePropertiesList,
        nineSliceSpritePropertiesList: store.nineSliceSpritePropertiesList,
        entityTypesList: store.entityTypesList,
        resourcesList: store.resourcesList,
        graphicsList: store.graphicsList,
        textPropertiesList: store.textPropertiesList
    };
};

export const MainScene = connect(
    mapStateToProps, {}
)(MainSceneComponent)
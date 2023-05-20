import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { createPixiTree } from "./custom/createPixiTree";
import { CInteractiveContainer } from "./custom";
import { setSelectedNodeIDAction } from "../../store/tree";

function collectChildren(displayObject, result = []) {
    // Add the current displayObject to the result array
    result.push([displayObject.name, displayObject]);

    // Check if the displayObject has children
    if (displayObject.children && displayObject.children.length > 0) {
        // Recursively collect the children of the displayObject
        for (const child of displayObject.children) {
            collectChildren(child, result);
        }
    }

    // Return the final result array
    return result;
}

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
const MainSceneComponent = ({ treeData, setSelectedNodeIDAction, ...dependencies }) => {
    const interactiveContainerRef = useRef(null);
    // store all the pixi elements for a hit-box test. The array will contain elements in the backwards order
    // where the last element is the root element in the hierarchy of the tree data
    const collection = [];

    useEffect(() => {
        const [interactiveContainer, ...others] = collectChildren(interactiveContainerRef.current, [])
        collection.push(...others.reverse());
    }, [treeData, dependencies]);

    const onClick = (event) => {
        const data = collection.find(([id, element]) => element.containsPoint && element.containsPoint(event.data.global))
        const id = data ? parseInt(data[0]) : null;
        setSelectedNodeIDAction(id);
    };

    return (
        <CInteractiveContainer ref={interactiveContainerRef} onClick={onClick}>
            {treeData ? createPixiTree(treeData, dependencies) : null}
        </CInteractiveContainer>
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
    mapStateToProps, { setSelectedNodeIDAction }
)(MainSceneComponent)
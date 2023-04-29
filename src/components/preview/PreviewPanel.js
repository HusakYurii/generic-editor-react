import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Stage } from 'react-pixi-fiber';
import { createPixiTree } from "./custom/createPixiTree";
import { ResizeController } from "./ResizeContoller";

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

    const stageRef = useRef(null);

    useEffect(() => {
        // I could have used the AppContext to provide the reference to the app, but I would need to create an extra
        // component, which maybe redundant, and move logic there. But accessing private properties works for the prototype
        const stage = stageRef.current._app.current.stage;
        const renderer = stageRef.current._app.current.renderer;
        const parentDivElement = stageRef.current._canvas.current.parentElement;

        const resizeController = new ResizeController(renderer, { width: 950, height: 950 });

        const observer = new ResizeObserver(() => {
            resizeController.resize({ width: parentDivElement.offsetWidth, height: parentDivElement.offsetHeight });
            // I could have used useState and pass x,y to the <Stage/> but that makes an extra rendering call I don't need
            stage.position.set(resizeController.size.width / 2, resizeController.size.height / 2)
        });

        observer.observe(parentDivElement);

        return () => observer.unobserve(parentDivElement);
    }, [])

    return (
        <Stage ref={stageRef} options={{ backgroundColor: 0xc2c2c2 }}>
            {createPixiTree(tree.treeData, basePropertiesList, spritePropertiesList, entityTypesList, resourcesList)}
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
    mapStateToProps, {}
)(PreviewPanelComponent)
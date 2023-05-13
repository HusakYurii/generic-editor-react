import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Stage, AppContext } from 'react-pixi-fiber';
import { createPixiTree } from "./custom/createPixiTree";
import { ResizeController } from "./ResizeContoller";

/**
 * @typedef {{
 * treeData:  import("../../data/NodeData").INodeData;
 * basePropertiesList: import("../../store/properties/base").IBasePropertiesListState;
 * spritePropertiesList: import("../../store/properties/sprite").ISpritePropertiesListState;
 * nineSliceSpritePropertiesList: import("../../store/properties/nineSliceSprite").INineSliceSpritePropertiesListState;
 * graphicsList: import("../../store/properties/graphics").IGraphicsPropertiesListState;
 * textPropertiesList: import("../../store/properties/text").ITextPropertiesListState;
 * entityTypesList: import("../../store/entityTypes").IEntityTypesListState;
 * resourcesList: import("../../store/resources").IResourcesListState;
 * }} PreviewPanelComponentDependencies
 */

/**
 * @param { PreviewPanelComponentDependencies} props 
 */
const PreviewPanelComponent = ({ treeData, ...dependencies }) => {

    const pixiApp = useRef(null);

    useEffect(() => {
        const stage = pixiApp.current.stage;
        const renderer = pixiApp.current.renderer;
        const parentDivElement = pixiApp.current.view.parentElement;

        const resizeController = new ResizeController(renderer, { width: 1280, height: 1280 });

        const observer = new ResizeObserver(() => {
            resizeController.resize({ width: parentDivElement.offsetWidth, height: parentDivElement.offsetHeight });
            // I could have used useState and pass x,y to the <Stage/> but that makes an extra rendering call I don't need
            stage.position.set(resizeController.size.width / 2, resizeController.size.height / 2)
        });

        observer.observe(parentDivElement);

        return () => observer.unobserve(parentDivElement);
    }, []);

    // This is a small workaround to get the instance of the pixi app avoiding different issues
    // when I tried to use withApp hook in combination with redux connect hook
    const setApp = (app) => {
        if (pixiApp.current) {
            return;
        }
        pixiApp.current = app;
    }

    return (
        <Stage options={{ backgroundColor: 0xffffff }}>
            <AppContext.Consumer>
                {setApp}
            </AppContext.Consumer>
            {createPixiTree(treeData, dependencies)}
        </Stage>
    );
};

/**
 * @param {import("../../store").IStore} data 
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

export const PreviewPanel = connect(
    mapStateToProps, {}
)(PreviewPanelComponent)
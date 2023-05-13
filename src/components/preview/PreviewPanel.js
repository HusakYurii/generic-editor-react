import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Stage, AppContext, Container } from 'react-pixi-fiber';
import { createPixiTree } from "./custom/createPixiTree";
import { ResizeController } from "./ResizeContoller";
import { CameraController } from "./CameraController";
import { CGrid } from "./custom/CGrid";

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

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState({ x: 1, y: 1 });

    const pixiApp = useRef(null);
    // for grid graphics
    const cellSize = 50;
    const gridSize = 100;

    useEffect(() => {
        const stage = pixiApp.current.stage;
        const view = pixiApp.current.view;
        const ticker = pixiApp.current.ticker;
        const renderer = pixiApp.current.renderer;
        const parentDivElement = view.parentElement;

        const resizeController = new ResizeController(renderer, { width: 1280, height: 1280 });
        const cameraController = new CameraController(view, ticker, { min: 1, max: 3 }, { setPosition, setScale });

        const observer = new ResizeObserver(() => {
            resizeController.resize({ width: parentDivElement.offsetWidth, height: parentDivElement.offsetHeight });
            // I could have used useState and pass x,y to the <Stage/> but that makes an extra rendering call I don't need
            stage.position.set(resizeController.size.width / 2, resizeController.size.height / 2)
        });

        observer.observe(parentDivElement);

        return () => {
            observer.unobserve(parentDivElement);
            cameraController.destroy();
        };
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
            <Container x={position.x} y={position.y} scale={scale}>
                <CGrid {...{ cellSize, gridSize, color: 0xc2c2c2, lineWidth: 2 }} />
                {createPixiTree(treeData, dependencies)}
            </Container>
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
import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types'
import { connect, Provider } from "react-redux";
import { Stage, AppContext, Container, withApp } from 'react-pixi-fiber';
import { createPixiTree } from "./custom/createPixiTree";
import { ResizeController } from "./ResizeContoller";
import { CameraController } from "./CameraController";
import { CGrid } from "./custom/CGrid";
import { MainScene } from "./MainScene";
import store from "../../store";

const PreviewPanelComponent = ({ app }) => {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState({ x: 1, y: 1 });

    useEffect(() => {
        const parentDivElement = app.view.parentElement;

        const resizeController = new ResizeController(app.renderer, { width: 1280, height: 1280 });

        const observer = new ResizeObserver(() => {
            resizeController.resize({ width: parentDivElement.offsetWidth, height: parentDivElement.offsetHeight });
            // I could have used useState and pass x,y to the <Stage/> but that makes an extra rendering call I don't need
            app.stage.position.set(resizeController.size.width / 2, resizeController.size.height / 2)
        });

        observer.observe(parentDivElement);

        return () => observer.unobserve(parentDivElement);
    }, []);

    useEffect(() => {
        const cameraController = new CameraController(app.view, app.ticker, { min: 1, max: 3 }, { setPosition, setScale });
        return () => cameraController.destroy();
    }, []);

    return (
        <Container x={position.x} y={position.y} scale={scale}>
            <CGrid {...{ cellSize: 50, gridSize: 100, color: 0xc2c2c2, lineWidth: 2 }} />
            {/* 
                I have to rewrap the <MainScene /> with provider because, apparently, withApp() hook changes context, so I need to set it back.
                Otherwise, I see: 
                `Could not find "store" in the context of "Connect(MainSceneComponent)". 
                Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider>
                and the corresponding React context consumer to Connect(MainSceneComponent) in connect options.`

            */}
            <Provider store={store}>
                <MainScene />
            </Provider>
        </Container>
    );
};

PreviewPanelComponent.propTypes = {
    app: PropTypes.object.isRequired
};

export const PreviewPanel = withApp(PreviewPanelComponent)
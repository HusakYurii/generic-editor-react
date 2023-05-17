import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { Provider } from "react-redux";
import { withApp } from 'react-pixi-fiber';
import { CGrid } from "./custom/CGrid";
import { MainScene } from "./MainScene";
import store from "../../store";
import { CContainer } from "./custom/CContainer";

export const CameraContainerID = "CameraContainer";

export const PreviewPanel = ({ services }) => {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState({ x: 1, y: 1 });

    useEffect(() => {
        const resizeHandler = (size) => {
            // I could have used useState and pass x,y to the <Stage/> but that makes an extra rendering call I don't need
            services.app.stage.position.set(size.width / 2, size.height / 2)
        };
        services.resize.on("sizeChanged", resizeHandler);
        services.resize.activate();

        return () => {
            services.resize.off("sizeChanged", resizeHandler);
            services.resize.deactivate();
        }
    }, []);

    useEffect(() => {
        const handleScaleChanged = ({ x, y }) => setScale({ x, y });
        const handlePositionChanged = ({ x, y }) => setPosition({ x, y });

        services.camera.on("scaleChanged", handleScaleChanged);
        services.camera.on("positionChanged", handlePositionChanged);
        services.camera.activate();

        return () => {
            services.camera.off("scaleChanged", handleScaleChanged);
            services.camera.off("positionChanged", handlePositionChanged);
            services.camera.deactivate();
        }
    }, []);

    return (
        <CContainer {...{ id: CameraContainerID, positionX: position.x, positionY: position.y, scaleX: scale.x, scaleY: scale.y, rotation: 0 }}>
            <CGrid {...{ id: "CGrid", cellSize: 50, gridSize: 100, color: 0xc2c2c2, lineWidth: 2 }} />
            {/* 
                I have to rewrap the <MainScene /> with provider because, apparently, pixi fiber components inherently get context from pixi, so I need to set it back.
                Otherwise, I see: 
                `Could not find "store" in the context of "Connect(MainSceneComponent)". 
                Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider>
                and the corresponding React context consumer to Connect(MainSceneComponent) in connect options.`

            */}
            <Provider store={store}>
                <MainScene />
            </Provider>
        </CContainer>
    );
};
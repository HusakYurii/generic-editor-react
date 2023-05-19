import React, { useState } from "react";
import { Application } from "pixi.js";
import { Provider } from "react-redux";
import store from "../../store"

import { PositionGizmo } from "./position";
import { ScaleGizmo } from "./scale";

const TRANSFORM_METHODS = {
    SCALE: "SCALE",
    POSITION: "POSITION",
    ROTATION: "ROTATION"
};

const METHODS_TO_GIZMO_MAP = {
    [TRANSFORM_METHODS.POSITION]: (props) => <PositionGizmo services={props.services} />,
    [TRANSFORM_METHODS.SCALE]: (props) => <ScaleGizmo services={props.services} />,
};

/**
 * @param { {services: {} }} props 
 */
export const InteractiveTransformTools = (props) => {
    const [transformMethod, setTransformMethod] = useState(TRANSFORM_METHODS.SCALE);

    return (
        /* 
              I have to rewrap the <MainScene /> with provider because, apparently, pixi fiber components 
              inherently get context from pixi, so I need to set it back. Otherwise, I see: 
              `Could not find "store" in the context of "Connect(PositionGizmo)". something something
          */
        <Provider store={store}>
            {
                METHODS_TO_GIZMO_MAP[transformMethod](props)
            }
            {/* <ScaleGizmo services={props.services} /> */}
            {/* <PositionGizmo services={props.services} /> */}
        </Provider>
    )
}
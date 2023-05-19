import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "../../store"

import { PositionGizmo } from "./position";
import { ScaleGizmo } from "./scale";
import { DOM_GIZMO_BUTTON_TYPES } from "../../services/DOMGizmoButtons";

const TRANSFORM_METHODS = {
    SCALE: "SCALE",
    POSITION: "POSITION",
    ROTATION: "ROTATION"
};


const METHODS_TO_BUTTONS_MAP = {
    [DOM_GIZMO_BUTTON_TYPES.MOVE]: TRANSFORM_METHODS.POSITION,
    [DOM_GIZMO_BUTTON_TYPES.SCALE]: TRANSFORM_METHODS.SCALE,
    [DOM_GIZMO_BUTTON_TYPES.ROTATE]: TRANSFORM_METHODS.ROTATION,
}

const METHODS_TO_GIZMO_MAP = {
    [TRANSFORM_METHODS.POSITION]: (props) => <PositionGizmo services={props.services} />,
    [TRANSFORM_METHODS.SCALE]: (props) => <ScaleGizmo services={props.services} />,
};

/**
 * @param { {services: {} }} props 
 */
export const InteractiveTransformTools = (props) => {
    const [transformMethod, setTransformMethod] = useState(TRANSFORM_METHODS.SCALE);

    useEffect(() => {
        props.services.gizmoButtons.onButtonClicked((type) => {
            setTransformMethod(METHODS_TO_BUTTONS_MAP[type]);
        });
        props.services.gizmoButtons.activate();

        return () => {
            props.services.gizmoButtons.deactivate();
            props.services.gizmoButtons.onButtonClicked(null);
        }
    }, [])
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
        </Provider>
    )
}
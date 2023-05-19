import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "../../store"

import { PositionGizmo } from "./position";
import { ScaleGizmo } from "./scale";
import { DOM_GIZMO_BUTTON_TYPES } from "../../services/DOMGizmoButtons";
import { RotationGizmo } from "./rotation";


const METHODS_TO_GIZMO_MAP = {
    [DOM_GIZMO_BUTTON_TYPES.MOVE]: (props) => <PositionGizmo services={props.services} />,
    [DOM_GIZMO_BUTTON_TYPES.SCALE]: (props) => <ScaleGizmo services={props.services} />,
    [DOM_GIZMO_BUTTON_TYPES.ROTATE]: (props) => <RotationGizmo services={props.services} />,
};

/**
 * @param { {services: {} }} props 
 */
export const InteractiveTransformTools = (props) => {
    const [transformMethod, setTransformMethod] = useState("");

    useEffect(() => {
        props.services.gizmoButtons.onButtonClicked((type) => setTransformMethod(type));
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
                METHODS_TO_GIZMO_MAP[transformMethod] && METHODS_TO_GIZMO_MAP[transformMethod](props)
            }
        </Provider>
    )
}
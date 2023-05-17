import React from "react";
import { Application } from "pixi.js";
import { withApp } from "react-pixi-fiber";
import { Provider } from "react-redux";
import store from "../../store"

import { PositionGizmo } from "./position";


/**
 * @param { {app: Application }} props 
 */
const InteractiveTransformToolsComponent = (props) => {

    return (
        <Provider store={store}>
            <PositionGizmo app={props.app} />
        </Provider>
    )
}

export const InteractiveTransformTools = withApp(InteractiveTransformToolsComponent)
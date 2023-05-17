import React from "react";
import { Application } from "pixi.js";
import { Provider } from "react-redux";
import store from "../../store"

import { PositionGizmo } from "./position";


/**
 * @param { {services: {} }} props 
 */
export const InteractiveTransformTools = (props) => {

    return (
        /* 
              I have to rewrap the <MainScene /> with provider because, apparently, pixi fiber components 
              inherently get context from pixi, so I need to set it back. Otherwise, I see: 
              `Could not find "store" in the context of "Connect(PositionGizmo)". something something
          */
        <Provider store={store}>
            <PositionGizmo services={props.services} />
        </Provider>
    )
}
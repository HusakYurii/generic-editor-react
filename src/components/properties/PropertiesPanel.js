import React from "react";
import { connect } from "react-redux";
import store from "../../store";

import "./propertiesPanel.css";
import "./genericInputs/genericInputStyle.css";

import { ContainerEntity, isContainerEntity } from "./ContainerEntity";
import { SpriteEntity, isSpriteEntity } from "./SpriteEntity";
import { GraphicsEntity, isGraphicsEntity } from "./GraphicsEntity";
import { NineSliceSpriteEntity, isNineSliceSpriteEntity } from "./NineSliceSpriteEntity";
import { TextEntity, isTextEntity } from "./TextEntity";

const ENTITY_TYPES_TO_COMPONENTS_MAP = [
    { checker: isContainerEntity, component: <ContainerEntity /> },
    { checker: isSpriteEntity, component: <SpriteEntity /> },
    { checker: isGraphicsEntity, component: <GraphicsEntity /> },
    { checker: isNineSliceSpriteEntity, component: <NineSliceSpriteEntity /> },
    { checker: isTextEntity, component: <TextEntity /> },
]

const PropertiesPanelComponent = (props) => {
    const id = props.selectedNodeID;


    const entity = ENTITY_TYPES_TO_COMPONENTS_MAP.find((entity) => entity.checker(id, store.getState()));

    return (
        <div style={{ marginTop: 20 }}>
            {entity ? entity.component : null}
        </div>
    )
}


/**
 * @param {import("../../../store").IStore} data 
 */
const mapStateToProps = ({ tree }) => {
    return {
        selectedNodeID: tree.selectedNodeID
    }
};

export const PropertiesPanel = connect(
    mapStateToProps, {}
)(PropertiesPanelComponent)
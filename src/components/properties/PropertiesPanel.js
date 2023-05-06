import React from "react";
import { connect } from "react-redux";
import store from "../../store";

import "./propertiesPanel.css";

import { ContainerEntity, isContainerEntity } from "./ContainerEntity";
import { SpriteEntity, isSpriteEntity } from "./SpriteEntity";
import { GraphicsEntity, isGraphicsEntity } from "./GraphicsEntity";

const TYPE_TO_ENTITY_MAP = [
    { checker: isContainerEntity, component: <ContainerEntity /> },
    { checker: isSpriteEntity, component: <SpriteEntity /> },
    { checker: isGraphicsEntity, component: <GraphicsEntity /> },
]

const PropertiesPanelComponent = (props) => {
    const id = props.selectedNodeID;


    const entity = TYPE_TO_ENTITY_MAP.find((entity) => entity.checker(id, store.getState()));

    return (
        <div>
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
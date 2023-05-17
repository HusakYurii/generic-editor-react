import React, { useRef, useEffect } from "react";
import { Application, Point } from "pixi.js";
import { connect } from "react-redux";
import { updateBasePropertiesAction } from "../../../store/properties/base";
import { PositionArrows } from "./PositionArrows";
import { CameraContainerID } from "../../preview/PreviewPanel";
import { round } from "lodash";

const getGlobalRotation = (object) => {
    let globalRotation = 0;

    let parentContainer = object.parent;
    while (parentContainer) {
        globalRotation += parentContainer.rotation;
        parentContainer = parentContainer.parent;
    }

    return globalRotation;
};





/**
 * @typedef {{
 * app: Application; 
 * selectedNodeID: number;
 * treeData: import("../../../store/tree").ITreeState["treeData"];
 * basePropertiesList: import("../../../store/properties/base").IBasePropertiesListState;
 * spritePropertiesList: import("../../../store/properties/sprite").ISpritePropertiesListState;
 * nineSliceSpritePropertiesList: import("../../../store/properties/nineSliceSprite").INineSliceSpritePropertiesListState;
 * graphicsList: import("../../../store/properties/graphics").IGraphicsPropertiesListState;
 * textPropertiesList: import("../../../store/properties/text").ITextPropertiesListState;
 * entityTypesList: import("../../../store/entityTypes").IEntityTypesListState;
 * resourcesList: import("../../../store/resources").IResourcesListState;
 * updateBasePropertiesAction: typeof updateBasePropertiesAction;
 * 
 * }} PositionGizmoComponentDependencies
 */


/**
 * @param {PositionGizmoComponentDependencies} props 
 */
const PositionGizmoComponent = ({ app, selectedNodeID, updateBasePropertiesAction, basePropertiesList }) => {

    const positionArrows = useRef(new PositionArrows(app.ticker));

    useEffect(() => {
        return () => positionArrows.current.destroy();
    }, []);

    if (selectedNodeID) {
        app.stage.addChild(positionArrows.current.view);

        const baseProperties = basePropertiesList[selectedNodeID];

        const element = app.stage.getChildByName(String(selectedNodeID));
        const camera = app.stage.getChildByName(CameraContainerID);

        const globalPosition = element.toGlobal(new Point());
        const localPosition = app.stage.toLocal(globalPosition);

        positionArrows.current.initPositions(localPosition);
        positionArrows.current.onPositionMove((dx, dy) => {
            const rotation = getGlobalRotation(element);

            dx = dx / camera.scale.x;
            dy = dy / camera.scale.y;

            const x = dx * Math.cos(rotation) + dy * Math.sin(rotation)
            const y = -dx * Math.sin(rotation) + dy * Math.cos(rotation)

            const properties = { ...baseProperties };
            properties.positionX = round(properties.positionX + x, 2);
            properties.positionY = round(properties.positionY + y, 2);

            updateBasePropertiesAction({ nodeID: selectedNodeID, properties });
        });
    }
    else {
        app.stage.removeChild(positionArrows.current.view);
        positionArrows.current.onPositionMove(null);
    }

    return (
        <></>
    )
}

/**
 * @param {import("../../../store").IStore} store 
 */
const mapStateToProps = (store) => {
    return {
        selectedNodeID: store.tree.selectedNodeID,
        treeData: store.tree.treeData,
        basePropertiesList: store.basePropertiesList,
        spritePropertiesList: store.spritePropertiesList,
        nineSliceSpritePropertiesList: store.nineSliceSpritePropertiesList,
        entityTypesList: store.entityTypesList,
        resourcesList: store.resourcesList,
        graphicsList: store.graphicsList,
        textPropertiesList: store.textPropertiesList
    }
};


export const PositionGizmo = connect(
    mapStateToProps,
    { updateBasePropertiesAction }
)(PositionGizmoComponent)
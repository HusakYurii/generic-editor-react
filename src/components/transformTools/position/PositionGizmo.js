import React, { useEffect } from "react";
import { Point } from "pixi.js";
import { connect } from "react-redux";
import { updateBasePropertiesAction } from "../../../store/properties/base";
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
 * services: {},
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
const PositionGizmoComponent = ({ services, selectedNodeID, updateBasePropertiesAction, basePropertiesList }) => {

    useEffect(() => {
        services.gizmoPositionArrows.activate();
        return () => {
            services.gizmoPositionArrows.onMoved(null);
            services.gizmoPositionArrows.deactivate();
        };
    }, []);


    if (selectedNodeID) {
        services.app.stage.addChild(services.gizmoPositionArrows.view);

        const element = services.getChildByName(services.app.stage, String(selectedNodeID));

        const globalPosition = element.toGlobal(new Point());
        const localPosition = services.app.stage.toLocal(globalPosition);

        services.gizmoPositionArrows.initPositions(localPosition);

        services.gizmoPositionArrows.onMoved((dx, dy) => {
            const rotation = getGlobalRotation(element);

            const offset = services.camera.applyScale({ x: dx, y: dy });

            const x = offset.x * Math.cos(rotation) + offset.y * Math.sin(rotation)
            const y = -offset.x * Math.sin(rotation) + offset.y * Math.cos(rotation)

            const properties = { ...basePropertiesList[selectedNodeID] };
            properties.positionX = round(properties.positionX + x, 2);
            properties.positionY = round(properties.positionY + y, 2);

            updateBasePropertiesAction({ nodeID: selectedNodeID, properties });
        });
    }
    else {
        services.app.stage.removeChild(services.gizmoPositionArrows.view);
        services.gizmoPositionArrows.onMoved(null);
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
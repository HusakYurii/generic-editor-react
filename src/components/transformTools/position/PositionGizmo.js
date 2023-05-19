import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateBasePropertiesAction } from "../../../store/properties/base";
import { round } from "lodash";

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
        services.app.stage.addChild(services.gizmoPositionArrows.view);
        services.gizmoPositionArrows.activate();
        return () => {
            services.app.stage.removeChild(services.gizmoPositionArrows.view);
            services.gizmoPositionArrows.deactivate();
        };
    }, []);

    useEffect(() => {
        if (!selectedNodeID) {
            return () => { };
        }

        const handleCameraUpdate = () => {
            const element = services.pixiTools.getChildByName(services.app.stage, String(selectedNodeID));
            services.gizmoPositionArrows.setPosition(services.pixiTools.getChildRelativePosition(element, services.app.stage));
            services.gizmoPositionArrows.setRotation(services.pixiTools.getGlobalRotation(element));
            services.gizmoPositionArrows.setElementRotation(element.rotation);
        };

        handleCameraUpdate();

        services.camera.on("update", handleCameraUpdate);

        return () => services.camera.off("update", handleCameraUpdate);

    }, [selectedNodeID]);


    if (selectedNodeID) {

        const element = services.pixiTools.getChildByName(services.app.stage, String(selectedNodeID));

        services.gizmoPositionArrows.show();
        services.gizmoPositionArrows.setPosition(services.pixiTools.getChildRelativePosition(element, services.app.stage));
        services.gizmoPositionArrows.setRotation(services.pixiTools.getGlobalRotation(element));
        services.gizmoPositionArrows.setElementRotation(element.rotation);

        services.gizmoPositionArrows.onMoved((dx, dy) => {
            const offset = services.camera.applyScale({ x: dx, y: dy });

            const properties = { ...basePropertiesList[selectedNodeID] };
            properties.positionX = round(properties.positionX + offset.x, 2);
            properties.positionY = round(properties.positionY + offset.y, 2);

            updateBasePropertiesAction({ nodeID: selectedNodeID, properties });
        });
    }
    else {
        services.gizmoPositionArrows.hide();
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
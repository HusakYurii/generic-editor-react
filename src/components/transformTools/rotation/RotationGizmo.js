import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateBasePropertiesAction } from "../../../store/properties/base";
import { round } from "lodash";
import { toDegrees } from "../../../tools/math";

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
 * }} RotationGizmoComponentDependencies
 */


/**
 * @param {RotationGizmoComponentDependencies} props 
 */
const RotationGizmoComponent = ({ services, selectedNodeID, updateBasePropertiesAction, basePropertiesList }) => {

    useEffect(() => {
        services.app.stage.addChild(services.gizmoRotation.view);
        services.gizmoRotation.activate();
        return () => {
            services.app.stage.removeChild(services.gizmoRotation.view);
            services.gizmoRotation.deactivate();
        };
    }, []);

    useEffect(() => {
        if (!selectedNodeID) {
            return () => { };
        }

        const handleCameraUpdate = () => {
            const element = services.pixiTools.getChildByName(services.app.stage, String(selectedNodeID));
            services.gizmoRotation.setPosition(services.pixiTools.getChildRelativePosition(element, services.app.stage));
            // services.gizmoRotation.setRotation(services.pixiTools.getGlobalRotation(element));
            // services.gizmoRotation.setElementRotation(element.rotation);
        };

        handleCameraUpdate();

        services.camera.on("update", handleCameraUpdate);

        return () => services.camera.off("update", handleCameraUpdate);

    }, [selectedNodeID]);


    if (selectedNodeID) {

        const element = services.pixiTools.getChildByName(services.app.stage, String(selectedNodeID));

        services.gizmoRotation.show();
        services.gizmoRotation.setPosition(services.pixiTools.getChildRelativePosition(element, services.app.stage));
        // services.gizmoRotation.setRotation(services.pixiTools.getGlobalRotation(element));
        // services.gizmoRotation.setElementRotation(element.rotation);

        services.gizmoRotation.onMoved((angle) => {
            // const offset = services.camera.applyScale({ x: dx, y: dy });

            const properties = { ...basePropertiesList[selectedNodeID] };
            properties.rotation = round(properties.rotation + toDegrees(angle), 2);

            updateBasePropertiesAction({ nodeID: selectedNodeID, properties });
        });
    }
    else {
        services.gizmoRotation.hide();
        services.gizmoRotation.onMoved(null);
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


export const RotationGizmo = connect(
    mapStateToProps,
    { updateBasePropertiesAction }
)(RotationGizmoComponent)
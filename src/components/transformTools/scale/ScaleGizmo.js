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
 * }} ScaleGizmoComponentDependencies
 */


/**
 * @param {ScaleGizmoComponentDependencies} props 
 */
const ScaleGizmoComponent = ({ services, selectedNodeID, updateBasePropertiesAction, basePropertiesList }) => {

    useEffect(() => {
        services.app.stage.addChild(services.gizmoScaleBox.view);
        services.gizmoScaleBox.activate();
        return () => {
            services.app.stage.removeChild(services.gizmoScaleBox.view);
            services.gizmoScaleBox.deactivate();
        };
    }, []);

    useEffect(() => {
        if (!selectedNodeID) {
            return () => { };
        }

        const handleCameraUpdate = () => {
            const element = services.pixiTools.getChildByName(services.app.stage, String(selectedNodeID));
            services.gizmoScaleBox.setPosition(services.pixiTools.getChildRelativePosition(element, services.app.stage));
            services.gizmoScaleBox.setRotation(services.pixiTools.getGlobalRotation(element));
        };

        handleCameraUpdate();

        services.camera.on("update", handleCameraUpdate);

        return () => services.camera.off("update", handleCameraUpdate);

    }, [selectedNodeID]);


    if (selectedNodeID) {

        const element = services.pixiTools.getChildByName(services.app.stage, String(selectedNodeID));

        services.gizmoScaleBox.show();
        services.gizmoScaleBox.setPosition(services.pixiTools.getChildRelativePosition(element, services.app.stage));
        services.gizmoScaleBox.setRotation(services.pixiTools.getGlobalRotation(element));

        services.gizmoScaleBox.onMoved((dx, dy) => {
            const x = dx / 100;
            const y = dy / 100;

            const properties = { ...basePropertiesList[selectedNodeID] };
            properties.scaleX = round(properties.scaleX + x, 2);
            properties.scaleY = round(properties.scaleY + y, 2);

            updateBasePropertiesAction({ nodeID: selectedNodeID, properties });
        });
    }
    else {
        services.gizmoScaleBox.hide();
        services.gizmoScaleBox.onMoved(null);
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


export const ScaleGizmo = connect(
    mapStateToProps,
    { updateBasePropertiesAction }
)(ScaleGizmoComponent)
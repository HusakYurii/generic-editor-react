import React, { useEffect } from "react";

import { connect } from "react-redux";
import { updateSpritePropertiesAction } from "../../../store/properties/sprite";

import { PointInput } from "../genericInputs/PointInput";
import { TextureInput } from "../genericInputs";


/**
 * @typedef {{
 * selectedNodeID: number | null;
 * resourcesList: import("../../../store/resources").IResourcesListState
 * spritePropertiesList: import("../../../store/properties/sprite").ISpritePropertiesListState;
 * updateSpritePropertiesAction: typeof updateSpritePropertiesAction;
 * }} SpritePropertiesComponentDependencies
 */

/**
 * Each node must have base properties
 * @param { SpritePropertiesComponentDependencies} props 
 * @returns
 */
const SpritePropertiesComponent = ({
    selectedNodeID,
    resourcesList,
    spritePropertiesList,
    updateSpritePropertiesAction
}) => {

    const id = selectedNodeID;

    const { anchorX, anchorY, resourceID } = spritePropertiesList[id];

    const resource = resourcesList[resourceID];
    const resourceName = resource ? resource.name : "";

    useEffect(() => {
        // Edge case when a resource get's removed from resources but the id is still in the sprite property
        if (resourceID && !resource) updateSpritePropertiesAction({ nodeID: id, resourceID: null });
    }, [resource]);

    const onInputChange = (event) => {
        const key = event.target.getAttribute("data-id");
        const parsedValue = parseFloat(event.target.value);
        const value = !Number.isNaN(parsedValue) ? parsedValue : "";

        updateSpritePropertiesAction({
            nodeID: id,
            properties: { ...spritePropertiesList[id], [key]: value }
        });
    };

    const onTextureAdded = (resourceID) => {
        updateSpritePropertiesAction({ nodeID: id, properties: { resourceID } });
    };

    const textureData = {
        label: "Texture",
        value: resourceName,
        onChange: onTextureAdded,
    };

    const anchorData = {
        label: "Anchor",
        dataIDs: ["anchorX", "anchorY"],
        values: [anchorX, anchorY],
        signs: ["X", "Y"],
        onChange: onInputChange
    };

    return (
        <div className="properties propertiesTopOffset">
            <TextureInput {...textureData} />
            <PointInput {...anchorData} />
        </div>
    )
}

/**
 * @param {import("../../../store").IStore} data 
 */
const mapStateToProps = ({ tree, spritePropertiesList, resourcesList }) => {
    return {
        spritePropertiesList: spritePropertiesList,
        selectedNodeID: tree.selectedNodeID,
        resourcesList: resourcesList
    }
};

export const SpriteProperties = connect(
    mapStateToProps,
    { updateSpritePropertiesAction }
)(SpritePropertiesComponent)
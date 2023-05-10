import React, { useEffect } from "react";

import { connect } from "react-redux";
import { updateNineSliceSpritePropertiesAction } from "../../../store/properties/nineSliceSprite";

import { PointInput } from "../genericInputs/PointInput";
import { TextureInput } from "../genericInputs";


/**
 * @typedef {{
 * selectedNodeID: number | null;
 * resourcesList: import("../../../store/resources").IResourcesListState
 * nineSliceSpritePropertiesList: import("../../../store/properties/nineSliceSprite").INineSliceSpritePropertiesListState;
 * updateNineSliceSpritePropertiesAction: typeof updateNineSliceSpritePropertiesAction;
 * }} NineSliceSpritePropertiesComponentDependencies
 */

/**
 * Each node must have base properties
 * @param { NineSliceSpritePropertiesComponentDependencies} props 
 * @returns
 */
const NineSliceSpritePropertiesComponent = ({
    selectedNodeID,
    resourcesList,
    nineSliceSpritePropertiesList,
    updateNineSliceSpritePropertiesAction
}) => {

    const id = selectedNodeID;

    const { anchor, size, corners, resourceID } = nineSliceSpritePropertiesList[id];

    const resource = resourcesList[resourceID];
    const resourceName = resource ? resource.name : "";

    useEffect(() => {
        // Edge case when a resource get's removed from resources but the id is still in the sprite property
        if (resourceID && !resource) updateNineSliceSpritePropertiesAction({ nodeID: id, resourceID: null });
    }, [resource]);

    const onInputChange = (event) => {
        const [groupKey, key] = event.target.getAttribute("data-id").split("-");
        const parsedValue = parseFloat(event.target.value);
        const value = !Number.isNaN(parsedValue) ? parsedValue : "";

        const payload = { nodeID: id, anchor: { ...anchor } };
        payload[groupKey][key] = value;

        updateNineSliceSpritePropertiesAction(payload);
    };

    const onTextureAdded = (resourceID) => {
        updateNineSliceSpritePropertiesAction({ nodeID: id, resourceID });
    };

    const textureData = {
        label: "Texture",
        value: resourceName,
        onChange: onTextureAdded,
    };

    const cornersABData = {
        label: "Corners",
        dataIDs: ["A", "B"],
        values: [corners.A, corners.B],
        signs: ["A", "B"],
        onChange: () => { },
    };

    const cornersCDData = {
        label: "",
        dataIDs: ["C", "D"],
        values: [corners.C, corners.D],
        signs: ["C", "D"],
        onChange: () => { },
    };

    const anchorData = {
        label: "Anchor",
        dataIDs: ["anchor-x", "anchor-y"],
        values: [anchor.x, anchor.y],
        signs: ["X", "Y"],
        onChange: onInputChange
    };

    const sizeData = {
        label: "Size",
        dataIDs: ["width", "height"],
        values: [size.width, size.height],
        signs: ["W", "H"],
        onChange: onInputChange
    };

    return (
        <div className="properties propertiesTopOffset">
            <TextureInput {...textureData} />
            <PointInput {...sizeData} />
            <PointInput {...anchorData} />
            <PointInput {...cornersABData} />
            <PointInput {...cornersCDData} />
        </div>
    )
}

/**
 * @param {import("../../../store").IStore} data 
 */
const mapStateToProps = ({ tree, nineSliceSpritePropertiesList, resourcesList }) => {
    return {
        nineSliceSpritePropertiesList: nineSliceSpritePropertiesList,
        selectedNodeID: tree.selectedNodeID,
        resourcesList: resourcesList
    }
};

export const NineSliceSpriteProperties = connect(
    mapStateToProps,
    { updateNineSliceSpritePropertiesAction }
)(NineSliceSpritePropertiesComponent)
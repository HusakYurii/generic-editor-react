import React, { useEffect } from "react";

import { connect } from "react-redux";
import { updateSpritePropertiesAction } from "../../../store/properties/sprite";

import "./spriteProperties.css";
import { PointInput } from "../genericInputs/PointInput";


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
const SpritePropertiesComponent = (props) => {

    const id = props.selectedNodeID;

    const { anchor, resourceID } = props.spritePropertiesList[id];

    const resource = props.resourcesList[resourceID];
    const resourceName = resource ? resource.name : "";

    useEffect(() => {
        // Edge case when a resource get's removed from resources but the id is still in the sprite property
        if (resourceID && !resource) props.updateSpritePropertiesAction({ nodeID: id, resourceID: null });
    }, [resource]);

    const onInputChange = (event) => {
        const [groupKey, key] = event.target.getAttribute("data-id").split("-");
        const parsedValue = parseFloat(event.target.value);
        const value = !Number.isNaN(parsedValue) ? parsedValue : "";

        const payload = { nodeID: id, anchor: { ...anchor } };
        payload[groupKey][key] = value;

        props.updateSpritePropertiesAction(payload);
    };

    /* for some reason preventDefault() has to be used otherwise onDrop event will not work */
    const onDragOver = (event) => event.preventDefault();
    const onDragEnter = ({ target }) => target.classList.add("dragOver");
    const onDragLeave = ({ target }) => target.classList.remove("dragOver");

    const onDrop = (event) => {
        onDragLeave(event);

        // @TODO find another way of doing it. I tried to add it to the dataTransfer.items, but it didn't work
        if (!window["__RESOURCE_ID"]) { return; }

        props.updateSpritePropertiesAction({ nodeID: id, resourceID: window["__RESOURCE_ID"] });
        window["__RESOURCE_ID"] = undefined;
    };

    const anchorData = {
        label: "Anchor",
        dataIDs: ["anchor-x", "anchor-y"],
        values: [anchor.x, anchor.y],
        onChange: onInputChange
    };

    return (
        <div className="properties propertiesTopOffset">
            <div className="flexRow">
                <span className="textLeft colorGray widthOneThird">Texture</span>
                <textarea
                    id="textureInput"
                    disabled value={resourceName}
                    onDragOver={onDragOver}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                ></textarea>
            </div>
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
import React, { useEffect } from "react";

import { connect } from "react-redux";
import { updateSpritePropertiesAction } from "../../../store/properties/sprite";

import "./spriteProperties.css";


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
        const [groupName, valueName] = event.target.id.split("-");
        const value = parseFloat(event.target.value) || "";

        const payload = { nodeID: id, anchor: { ...anchor } };
        payload[groupName][valueName] = value;

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

    return (
        <div id="sprite-properties" className="properties">
            <div>
                <span>Texture</span>
                <textarea
                    id="texture"
                    disabled value={resourceName}
                    onDragOver={onDragOver}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                ></textarea>
            </div>
            <div>
                <span>Anchor</span>
                <input type="number" id="anchor-x" step="0.01" value={anchor.x} onChange={onInputChange}></input>
                <input type="number" id="anchor-y" step="0.01" value={anchor.y} onChange={onInputChange}></input>
            </div>
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
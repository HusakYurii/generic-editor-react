import React from "react";

import { connect } from "react-redux";
import { updateSpritePropertiesAction } from "../../../store/properties/sprite";

import "./spriteProperties.css";


/**
 * @typedef {{
 * selectedNodeID: number | null;
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

    const { anchor, textureName } = props.spritePropertiesList[id];

    const onChange = (event) => {
        const [groupName, valueName] = event.target.id.split("-");
        const value = parseFloat(event.target.value);

        const payload = { nodeID: id, anchor: { ...anchor } };
        payload[groupName][valueName] = value;

        props.updateSpritePropertiesAction(payload);
    };

    const onTextureChange = (event) => {
        const payload = { nodeID: id, textureName: event.target.value };

        props.updateSpritePropertiesAction(payload);
    }

    return (
        <div id="sprite-properties" className="properties">
            <div>
                <span>Texture</span>
                {/* @TODO FINISH IT. IT should be connected to the actual textures in the assets component */}
                <select name="texture" id="texture-select" onChange={onTextureChange}>
                    <option value="Empty">Empty</option>
                    <option value="Example">Example</option>
                </select>
            </div>
            <div>
                <span>Anchor</span>
                <input type="number" id="anchor-x" value={anchor.x} onChange={onChange}></input>
                <input type="number" id="anchor-y" value={anchor.y} onChange={onChange}></input>
            </div>
        </div>
    )
}

/**
 * @param {import("../../../store").IStore} data 
 */
const mapStateToProps = ({ tree, spritePropertiesList }) => {
    return {
        spritePropertiesList: spritePropertiesList,
        selectedNodeID: tree.selectedNodeID
    }
};

export const SpriteProperties = connect(
    mapStateToProps,
    { updateSpritePropertiesAction }
)(SpritePropertiesComponent)
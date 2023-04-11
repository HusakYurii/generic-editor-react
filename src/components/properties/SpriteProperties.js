import React from "react";

import { connect } from "react-redux";
import { updateNodeSpritePropertiesActions } from "../../store/nodeProperties";

import "./spriteProperties.css";


/**
 * @typedef {{
 * selectedNodeID: number | null;
 * nodesSpritePropertiesList: import("../../store/nodeProperties/nodesSpritePropertiesReducer").NodesSpritePropertiesListState;
 * updateNodeSpritePropertiesActions: typeof updateNodeSpritePropertiesActions;
 * }} SpritePropertiesDependencies
 */

/**
 * Each node must have base properties
 * @param { SpritePropertiesDependencies} props 
 * @returns
 */
const SpritePropertiesComponent = (props) => {

    const id = props.selectedNodeID;

    if (!id) {
        return null;
    };

    if (!props.nodesSpritePropertiesList[id]) {
        return null;
    }

    const { anchor, textureName } = props.nodesSpritePropertiesList[id];

    const onChange = (event) => {
        const [groupName, valueName] = event.target.id.split("-");
        const value = parseFloat(event.target.value);

        const payload = { nodeID: id, anchor: { ...anchor } };
        payload[groupName][valueName] = value;

        props.updateNodeSpritePropertiesActions(payload);
    };

    const onTextureChange = (event) => {
        const payload = { nodeID: id, textureName: event.target.value };

        props.updateNodeSpritePropertiesActions(payload);
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

const mapStateToProps = ({ treeReducer, nodesSpritePropertiesListReducer }) => {
    return {
        nodesSpritePropertiesList: nodesSpritePropertiesListReducer,
        selectedNodeID: treeReducer.selectedNodeID
    }
};

export const SpriteProperties = connect(
    mapStateToProps,
    { updateNodeSpritePropertiesActions }
)(SpritePropertiesComponent)
import React from "react";

import { connect } from "react-redux";
import { updateNodeNameAction } from "../../../store/tree";
import { getNodeByID } from "../../../tools/treeTools";

import "./nameProperty.css";
import { TextInput } from "../genericInputs/TextInput";

const INVALID_NAME = "No name";

/**
 * @typedef {import("../../../store/tree").ITreeState & {
 * updateNodeNameAction: typeof updateNodeNameAction
 * }} NamePropertyComponentDependencies
 */

/**
 * @param {NamePropertyComponentDependencies} props 
 */
const NamePropertyComponent = (props) => {
    const node = getNodeByID(props.selectedNodeID, props.treeData);
    const isInvalid = (node.name.length === 0) || (node.name === INVALID_NAME);

    // update the name value of the selected node
    const onChange = (key, value) => {
        props.updateNodeNameAction({ nodeID: props.selectedNodeID, name: value });
    };

    // to verify the name value at the end. I must not be empty
    const onBlur = (event) => {
        let value = event.target.value.trim();
        value = value.length === 0 ? INVALID_NAME : value;

        props.updateNodeNameAction({ nodeID: props.selectedNodeID, name: value });
    };

    return (
        <div className="properties">
            <TextInput {
                ...{
                    label: "Name",
                    dataID: "name",
                    value: node.name,
                    className: isInvalid ? "invalidName" : "",
                    onChange,
                    onBlur
                }
            } />
        </div>
    )
}

/**
 * @param {import("../../../store").IStore} data 
 */
const mapStateToProps = ({ tree }) => {
    return {
        treeData: tree.treeData,
        selectedNodeID: tree.selectedNodeID
    }
};

export const NameProperty = connect(
    mapStateToProps,
    { updateNodeNameAction }
)(NamePropertyComponent)
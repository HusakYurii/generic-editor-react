import React, { useRef, useEffect } from "react";

import { connect } from "react-redux";
import { updateNodeNameAction } from "../../../store/tree";
import { getNodeByID } from "../../../tools/treeTools";

import "./nameProperty.css";


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

    // update the name value of the selected node
    const onChange = (event) => {
        props.updateNodeNameAction({ nodeID: props.selectedNodeID, name: event.target.value });
        if (event.target.value.length === 0) {
            event.target.classList.add("invalidName")
        }
        else {
            event.target.classList.remove("invalidName")
        }
    };

    // to verify the name value at the end. I must not be empty
    const onBlur = (event) => {
        let value = event.target.value.trim();
        if (value.length === 0) {
            value = "No name";
        }
        props.updateNodeNameAction({ nodeID: props.selectedNodeID, name: value });
    }

    return (
        <div className="properties flexRow">
            <span className="colorWhite widthOneThird">Name</span>
            <input
                className="widthTwoThird"
                type="text"
                value={node.name}
                onBlur={onBlur}
                onChange={onChange}
            />
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
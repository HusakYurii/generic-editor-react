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
    const inputRef = useRef(null);
    const node = getNodeByID(props.selectedNodeID, props.treeData);

    // update the name value of the selected node
    const onChange = (event) => {
        props.updateNodeNameAction({ nodeID: props.selectedNodeID, name: event.target.value });
        if (event.target.value.length === 0) {
            inputRef.current.classList.add("invalid")
        }
        else {
            inputRef.current.classList.remove("invalid")
        }
    };

    // to verify the name value at the end. I must not be empty
    const onBlur = () => {
        let value = inputRef.current.value.trim();
        if (value.length === 0) {
            value = "No name";
        }
        props.updateNodeNameAction({ nodeID: props.selectedNodeID, name: value });
    }

    return (
        <div id="name-property" className="properties">
            <span htmlFor="name">Name</span>
            <input type="text" ref={inputRef} value={node.name} onBlur={onBlur} onChange={onChange}></input>
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
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

    const onChange = (event) => {
        props.updateNodeNameAction({ nodeID: props.selectedNodeID, name: event.target.value });
        if (event.target.value.length === 0) {
            inputRef.current.classList.add("invalid")
        }
        else {
            inputRef.current.classList.remove("invalid")
        }
    };

    return (
        <div id="name-property" className="properties">
            <span htmlFor="name">Name</span>
            <input type="text" ref={inputRef} value={node.name} onChange={onChange}></input>
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
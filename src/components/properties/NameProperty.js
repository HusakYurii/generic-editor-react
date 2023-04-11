import React from "react";

import { connect } from "react-redux";
import { updateNodeNameAction } from "../../store/tree";
import { getNodeByID } from "../../tools/treeTools";

import "./nameProperty.css";


/**
 * @typedef {import("../../store/tree").ITreeState & {
 * updateNodeNameAction: typeof updateNodeNameAction
 * }} NamePropertyComponentDependencies
 */

/**
 * @param {NamePropertyComponentDependencies} props 
 */
const NamePropertyComponent = (props) => {

    const node = getNodeByID(props.selectedNodeID, props.treeData);

    if (!node) {
        return (<div></div>)
    };

    const onChange = (event) => {
        props.updateNodeNameAction({ nodeID: props.selectedNodeID, name: event.target.value });
    };

    return (
        <div id="name-property" className="properties">
            <span htmlFor="name">Name</span>
            <input type="text" value={node.name} onChange={onChange}></input>
        </div>
    )
}

/**
 * @param {import("../../store").IStore} data 
 */
const mapStateToProps = ({ treeReducer }) => {
    return {
        treeData: treeReducer.treeData,
        selectedNodeID: treeReducer.selectedNodeID
    }
};

export const NameProperty = connect(
    mapStateToProps,
    { updateNodeNameAction }
)(NamePropertyComponent)
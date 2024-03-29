import React from "react";
import { Node } from "./Node";

import "./tree.css";

import { connect } from "react-redux";


/**
* @typedef {{
 * treeData:  import("../../store/tree").ITreeState["treeData"];
 * }} TreeComponentDependencies
 */

/**
* @param { TreeComponentDependencies} props 
*/
const TreeComponent = ({ treeData }) => {

    return (
        <>
            {treeData ? <Node key={treeData.id} node={treeData} /> : null}
        </>
    );
};

/**
 * @param {import("../../store").IStore} data 
 */
const mapStateToProps = ({ tree }) => {
    return {
        treeData: tree.treeData,
    };
};

export const Tree = connect(
    mapStateToProps,
)(TreeComponent)
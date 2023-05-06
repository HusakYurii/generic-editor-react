
import React from "react";

import "./graphicsTypeSelector.css";
import { GRAPHICS_TYPES } from "../../../data/StoreData";
import { changeGraphicsTypeAction } from "../../../store/properties/graphics";
import { connect } from "react-redux";

const prettify = (string) => {
    string = string.toLocaleLowerCase().replace("_", " ");
    return string.replace(/\b\w/g, l => l.toUpperCase());
};

/**
 * @typedef {{
 * changeGraphicsTypeAction: typeof changeGraphicsTypeAction;
 * graphicsList: import("../../../store/properties/graphics").IGraphicsPropertiesListState;
 * selectedNodeID: number;
 * }} GraphicsTypeSelectorComponentDependencies
 */

/**
 * @param {GraphicsTypeSelectorComponentDependencies} props 
 */
export const GraphicsTypeSelectorComponent = ({ selectedNodeID, graphicsList, changeGraphicsTypeAction }) => {

    const entity = graphicsList[selectedNodeID];

    const onChange = (event) => changeGraphicsTypeAction(selectedNodeID, event.target.value);

    return (
        <div id="graphics-types-selector" className="properties">
            <p>Type</p>
            <select value={entity.type} onChange={onChange}>
                {Object.values(GRAPHICS_TYPES).map((type) => {
                    return <option key={type} value={type}>{prettify(type)}</option>
                })}
            </select>
        </div>
    )
};

/**
 * @param {import("../../../store").IStore} data 
 */
const mapStateToProps = ({ graphicsList, tree }) => {
    return {
        graphicsList: graphicsList,
        selectedNodeID: tree.selectedNodeID
    }
};


export const GraphicsTypeSelector = connect(
    mapStateToProps,
    { changeGraphicsTypeAction }
)(GraphicsTypeSelectorComponent);
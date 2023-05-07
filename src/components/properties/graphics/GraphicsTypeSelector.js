
import React from "react";

import "./graphicsTypeSelector.css";
import { GRAPHICS_TYPES } from "../../../data/StoreData";
import { changeGraphicsTypeAction } from "../../../store/properties/graphics";
import { connect } from "react-redux";
import { SelectorInput } from "../genericInputs/SelectorInput";

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

    const graphics = graphicsList[selectedNodeID];

    const onChange = (event) => {
        if (graphics.type === event.target.value) {
            return; // no need to change tot he same type
        }
        changeGraphicsTypeAction(selectedNodeID, event.target.value);
    }

    return (
        <div id="graphics-types-selector" className="properties">
            <SelectorInput {...{ label: "Type", selected: graphics.type, options: Object.values(GRAPHICS_TYPES), onChange }} />
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
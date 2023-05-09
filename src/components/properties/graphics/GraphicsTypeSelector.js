
import React from "react";

import { GRAPHICS_TYPES } from "../../../data/StoreData";
import { changeGraphicsTypeAction } from "../../../store/properties/graphics";
import { connect } from "react-redux";
import { SelectorInput } from "../genericInputs/SelectorInput";


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
        <div className="properties propertiesTopOffset">
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
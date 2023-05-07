
import React from "react";

import { connect } from "react-redux";
import { CircleProperties, RectangleProperties, RoundedRectangleProperties } from "./collection";
import { GRAPHICS_TYPES } from "../../../data/StoreData";


const COMPONENTS_MAP = {
    [GRAPHICS_TYPES.CIRCLE]: <CircleProperties />,
    [GRAPHICS_TYPES.RECTANGLE]: <RectangleProperties />,
    [GRAPHICS_TYPES.ROUNDED_RECTANGLE]: <RoundedRectangleProperties />
};

/**
 * @typedef {{
 * graphicsList: import("../../../store/properties/graphics").IGraphicsPropertiesListState;
 * selectedNodeID: number;
 * }} GraphicsPropertiesComponentDependencies
 */

/**
 * @param {GraphicsPropertiesComponentDependencies} props 
 */
export const GraphicsPropertiesComponent = ({ selectedNodeID, graphicsList }) => {

    const graphics = graphicsList[selectedNodeID];
    return (
        <div className="properties">
            {COMPONENTS_MAP[graphics.type]}
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


export const GraphicsProperties = connect(
    mapStateToProps,
    {}
)(GraphicsPropertiesComponent);
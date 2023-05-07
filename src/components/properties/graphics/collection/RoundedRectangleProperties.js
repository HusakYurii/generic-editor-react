
import React from "react";

import { connect } from "react-redux";
import { updateGraphicsPropertiesAction } from "../../../../store/properties/graphics";

/**
 * @typedef {{
* updateGraphicsPropertiesAction: typeof updateGraphicsPropertiesAction;
* graphicsList: import("../../../../store/properties/graphics").IGraphicsPropertiesListState;
* selectedNodeID: number;
* }} RoundedRectanglePropertiesComponentDependencies
*/

/**
 * @param {RoundedRectanglePropertiesComponentDependencies} props 
 */
export const RoundedRectanglePropertiesComponent = (props) => {
    return (
        <div>Rounded Rectangle</div>
    )
};

/**
 * @param {import("../../../../store").IStore} data 
 */
const mapStateToProps = ({ graphicsList, tree }) => {
    return {
        graphicsList: graphicsList,
        selectedNodeID: tree.selectedNodeID
    }
};

export const RoundedRectangleProperties = connect(
    mapStateToProps,
    { updateGraphicsPropertiesAction }
)(RoundedRectanglePropertiesComponent);
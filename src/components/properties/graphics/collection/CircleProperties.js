
import React from "react";

import { connect } from "react-redux";
import { updateGraphicsPropertiesAction } from "../../../../store/properties/graphics";

/**
 * @typedef {{
* updateGraphicsPropertiesAction: typeof updateGraphicsPropertiesAction;
* graphicsList: import("../../../../store/properties/graphics").IGraphicsPropertiesListState;
* selectedNodeID: number;
* }} CirclePropertiesComponentDependencies
*/

/**
 * @param {CirclePropertiesComponentDependencies} props 
 */
export const CirclePropertiesComponent = (props) => {
    return (
        <div>Circle</div>
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

export const CircleProperties = connect(
    mapStateToProps,
    { updateGraphicsPropertiesAction }
)(CirclePropertiesComponent);
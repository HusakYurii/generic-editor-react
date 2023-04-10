import React from "react";
import { connect } from "react-redux";
import { updateNodeNameAction } from "../../store/treeReducer";
import { NameProperty } from "./NameProperty";

import "./propertiesPanel.css";

const PropertiesPanelComponent = (props) => {


    return (
        <div>
            <NameProperty />
        </div>
    )
}

const mapStateToProps = ({ treeReducer }) => {
    return {
        treeData: treeReducer.treeData,
        selectedNodeID: treeReducer.selectedNodeID
    }
};

export const PropertiesPanel = connect(
    mapStateToProps,
    { updateNodeNameAction }
)(PropertiesPanelComponent)
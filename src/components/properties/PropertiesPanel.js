import React from "react";
import { connect } from "react-redux";
import { updateNodeNameAction } from "../../store/tree";
import { NameProperty } from "./NameProperty";
import { BaseProperties } from "./BaseProperties";

import "./propertiesPanel.css";

const PropertiesPanelComponent = (props) => {


    return (
        <div>
            <NameProperty />
            <BaseProperties />
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
import React from "react";

import { connect } from "react-redux";
import { updateBasePropertiesAction } from "../../../store/properties/base";

import { NumberInput, PointInput } from "../genericInputs";


/**
 * @typedef {{
 * selectedNodeID: number | null;
 * basePropertiesList: import("../../../store/properties/base").IBasePropertiesListState;
 * updateBasePropertiesAction: typeof updateBasePropertiesAction;
 * }} BasePropertiesComponentDependencies
 */

/**
 * Each node must have base properties
 * @param { BasePropertiesComponentDependencies} props 
 */
const BasePropertiesComponent = ({ selectedNodeID, basePropertiesList, updateBasePropertiesAction }) => {

    const nodeID = selectedNodeID;
    const baseProperty = basePropertiesList[nodeID];

    const onChange = (key, value) => {
        updateBasePropertiesAction({
            nodeID,
            properties: { ...baseProperty, [key]: value }
        });
    };

    const positionData = {
        label: "Position",
        dataIDs: ["positionX", "positionY"],
        values: [baseProperty.positionX, baseProperty.positionY],
        signs: ["X", "Y"],
        onChange
    };

    const scaleData = {
        label: "Scale",
        dataIDs: ["scaleX", "scaleY"],
        values: [baseProperty.scaleX, baseProperty.scaleY],
        signs: ["X", "Y"],
        onChange
    };

    const angleData = {
        label: "Rotation",
        dataID: "rotation",
        value: baseProperty.rotation,
        sign: "DEG",
        onChange
    };

    return (
        <div className="properties propertiesTopOffset">
            <PointInput {...positionData} />
            <PointInput {...scaleData} />
            <NumberInput {...angleData} />
        </div>
    )
}

/**
 * @param {import("../../../store").IStore} data 
 */
const mapStateToProps = ({ tree, basePropertiesList }) => {
    return {
        basePropertiesList: basePropertiesList,
        selectedNodeID: tree.selectedNodeID
    }
};

export const BaseProperties = connect(
    mapStateToProps,
    { updateBasePropertiesAction }
)(BasePropertiesComponent)
import React from "react";

import { connect } from "react-redux";
import { updateBasePropertiesAction } from "../../../store/properties/base";

import "./baseProperties.css";
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
    const { scale, position, rotation } = basePropertiesList[nodeID];

    const onPointChange = (event) => {
        const [groupKey, key] = event.target.getAttribute("data-id").split("-");
        const parsedValue = parseFloat(event.target.value);
        const value = !Number.isNaN(parsedValue) ? parsedValue : "";
        const payload = {
            nodeID,
            position: { ...position },
            scale: { ...scale },
        };
        payload[groupKey][key] = value;
        updateBasePropertiesAction(payload);
    };

    const onValueChange = (event) => {
        const parsedValue = parseFloat(event.target.value);
        const value = !Number.isNaN(parsedValue) ? parsedValue : "";

        const payload = {
            nodeID,
            rotation: value
        };

        updateBasePropertiesAction(payload);
    };

    const positionData = {
        label: "Position",
        dataIDs: ["position-x", "position-y"],
        values: [position.x, position.y],
        onChange: onPointChange
    };

    const scaleData = {
        label: "Scale",
        dataIDs: ["scale-x", "scale-y"],
        values: [scale.x, scale.y],
        onChange: onPointChange
    };

    const angleData = {
        label: "Rotation",
        dataID: "rotation",
        value: rotation,
        onChange: onValueChange
    };

    return (
        <div id="base-properties" className="properties">
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
import React from "react";

import { connect } from "react-redux";
import { updateNodeBasePropertiesActions } from "../../store/nodeProperties";

import "./baseProperties.css";


/**
 * @typedef {{
 * selectedNodeID: number | null;
 * nodesPropertiesList: import("../../store/nodeProperties/nodesPropertiesReducer").NodesPropertiesListState;
 * updateNodeBasePropertiesActions: typeof updateNodeBasePropertiesActions;
 * }} BasePropertiesDependencies
 */

/**
 * @param { BasePropertiesDependencies} props 
 * @returns
 */
const BasePropertiesComponent = (props) => {

    const id = props.selectedNodeID;

    if (!id) {
        return (<div></div>)
    };

    const { scale, position, rotation } = props.nodesPropertiesList[id];

    const onChange = (event) => {
        const [groupName, valueName] = event.target.id.split("-");
        const value = parseFloat(event.target.value);
        const payload = { nodeID: id };

        if (groupName === "position") payload[groupName] = { ...position, [valueName]: value };
        else if (groupName === "scale") payload[groupName] = { ...scale, [valueName]: value };
        else payload[groupName] = value;


        props.updateNodeBasePropertiesActions(payload);
    };

    return (
        <div id="base-properties" className="properties">
            <div>
                <span>Position</span>
                <input type="number" id="position-x" value={position.x} onChange={onChange}></input>
                <input type="number" id="position-y" value={position.y} onChange={onChange}></input>
            </div>

            <div>
                <span>Scale</span>
                <input type="number" id="scale-x" value={scale.x} onChange={onChange}></input>
                <input type="number" id="scale-y" value={scale.y} onChange={onChange}></input>
            </div>

            <div>
                <span>Rotation</span>
                <input type="number" id="rotation" value={rotation} onChange={onChange}></input>
            </div>
        </div>
    )
}

const mapStateToProps = ({ treeReducer, nodesPropertiesListReducer }) => {
    return {
        nodesPropertiesList: nodesPropertiesListReducer,
        selectedNodeID: treeReducer.selectedNodeID
    }
};

export const BaseProperties = connect(
    mapStateToProps,
    { updateNodeBasePropertiesActions }
)(BasePropertiesComponent)
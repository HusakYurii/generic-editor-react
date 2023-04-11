import React from "react";

import { connect } from "react-redux";
import { updateBasePropertiesAction } from "../../store/properties/base";

import "./baseProperties.css";


/**
 * @typedef {{
 * selectedNodeID: number | null;
 * basePropertiesList: import("../../store/properties/base").IBasePropertiesListState;
 * updateBasePropertiesAction: typeof updateBasePropertiesAction;
 * }} BasePropertiesComponentDependencies
 */

/**
 * Each node must have base properties
 * @param { BasePropertiesComponentDependencies} props 
 */
const BasePropertiesComponent = (props) => {

    const id = props.selectedNodeID;

    if (!id) {
        return (<div></div>)
    };

    const { scale, position, rotation } = props.basePropertiesList[id];

    const onChange = (event) => {
        const [groupName, valueName] = event.target.id.split("-");
        const value = parseFloat(event.target.value);
        const payload = { nodeID: id };

        if (groupName === "position") payload[groupName] = { ...position, [valueName]: value };
        else if (groupName === "scale") payload[groupName] = { ...scale, [valueName]: value };
        else payload[groupName] = value;


        props.updateBasePropertiesAction(payload);
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

/**
 * @param {import("../../store").IStore} data 
 */
const mapStateToProps = ({ treeReducer, basePropertiesListReducer }) => {
    return {
        basePropertiesList: basePropertiesListReducer,
        selectedNodeID: treeReducer.selectedNodeID
    }
};

export const BaseProperties = connect(
    mapStateToProps,
    { updateBasePropertiesAction }
)(BasePropertiesComponent)
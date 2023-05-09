
import React from "react";

import { connect } from "react-redux";
import { updateGraphicsPropertiesAction } from "../../../../store/properties/graphics";
import { ColorInput, NumberInput, PointInput } from "../../genericInputs";
import { convertColorFormat } from "../../../../tools/color";

/**
 * @typedef {{
* updateGraphicsPropertiesAction: typeof updateGraphicsPropertiesAction;
* graphicsList: import("../../../../store/properties/graphics").IGraphicsPropertiesListState;
* selectedNodeID: number;
* }} RectanglePropertiesComponentDependencies
*/

/**
 * @param {RectanglePropertiesComponentDependencies} props 
 */
export const RectanglePropertiesComponent = ({ selectedNodeID, graphicsList, updateGraphicsPropertiesAction }) => {

    const graphics = graphicsList[selectedNodeID];

    /**
     * @param {InputEvent} event 
     */
    const onChange = (event) => {
        const key = event.target.getAttribute("data-id");
        const parsedValue = parseFloat(event.target.value);
        const value = !Number.isNaN(parsedValue) ? parsedValue : "";
        updateGraphicsPropertiesAction({
            nodeID: selectedNodeID,
            properties: { ...graphics, ...{ [key]: value } }
        });
    };

    /**
     * @param {InputEvent} event 
     */
    const onColorChange = (event) => {
        const key = event.target.getAttribute("data-id");
        updateGraphicsPropertiesAction({
            nodeID: selectedNodeID,
            properties: { ...graphics, ...{ [key]: convertColorFormat(event.target.value) } }
        });
    };



    // I use origin here because position is already used in Base properties component
    const positionData = {
        label: "Origin",
        dataIDs: ["x", "y"],
        values: [graphics.x, graphics.y],
        signs: ["X", "Y"],
        onChange
    };
    const sizeData = {
        label: "Size",
        dataIDs: ["width", "height"],
        values: [graphics.width, graphics.height],
        signs: ["W", "H"],
        onChange
    };
    const colorData = {
        label: "Color",
        dataID: "color",
        value: convertColorFormat(graphics.color),
        onChange: onColorChange
    };
    const alphaData = {
        label: "Alpha",
        dataID: "alpha",
        value: graphics.alpha,
        step: 0.01,
        onChange
    };

    return (
        <>
            <PointInput {...positionData} />
            <PointInput {...sizeData} />
            <ColorInput {...colorData} />
            <NumberInput {...alphaData} />
        </>
    );
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

export const RectangleProperties = connect(
    mapStateToProps,
    { updateGraphicsPropertiesAction }
)(RectanglePropertiesComponent);
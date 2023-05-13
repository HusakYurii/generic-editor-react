
import React from "react";

import { connect } from "react-redux";
import { updateGraphicsPropertiesAction } from "../../../../store/properties/graphics";
import { ColorInput, NumberInput, PointInput, negativeNumbersMiddleware } from "../../genericInputs";
import { convertColorFormat } from "../../../../tools/color";

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
export const CirclePropertiesComponent = ({ selectedNodeID, graphicsList, updateGraphicsPropertiesAction }) => {

    const graphics = graphicsList[selectedNodeID];

    const onChange = (key, value) => {
        updateGraphicsPropertiesAction({
            nodeID: selectedNodeID,
            properties: { ...graphics, [key]: value }
        });
    };

    const onColorChange = (key, value) => {
        updateGraphicsPropertiesAction({
            nodeID: selectedNodeID,
            properties: { ...graphics, [key]: convertColorFormat(value) }
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
    const radiusData = {
        label: "Radius",
        dataID: "radius",
        value: graphics.radius,
        sign: "R",
        middleware: negativeNumbersMiddleware,
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
        middleware: negativeNumbersMiddleware,
        onChange
    };

    return (
        <>
            <PointInput {...positionData} />
            <NumberInput {...radiusData} />
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

export const CircleProperties = connect(
    mapStateToProps,
    { updateGraphicsPropertiesAction }
)(CirclePropertiesComponent);
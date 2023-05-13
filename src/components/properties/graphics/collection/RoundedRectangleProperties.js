
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
* }} RoundedRectanglePropertiesComponentDependencies
*/

/**
 * @param {RoundedRectanglePropertiesComponentDependencies} props 
 */
export const RoundedRectanglePropertiesComponent = ({ selectedNodeID, graphicsList, updateGraphicsPropertiesAction }) => {
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
        middleware: negativeNumbersMiddleware,
        onChange
    };

    const cornersData = {
        label: "Corner",
        dataID: "cornerRadius",
        value: graphics.cornerRadius,
        sign: "R",
        middleware: negativeNumbersMiddleware,
        onChange
    }

    return (
        <>
            <PointInput {...positionData} />
            <PointInput {...sizeData} />
            <NumberInput {...cornersData} />
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

export const RoundedRectangleProperties = connect(
    mapStateToProps,
    { updateGraphicsPropertiesAction }
)(RoundedRectanglePropertiesComponent);
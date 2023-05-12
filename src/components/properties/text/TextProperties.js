import React from "react";

import { connect } from "react-redux";
import { updateTextPropertiesAction } from "../../../store/properties/text";

import { PointInput } from "../genericInputs/PointInput";
import { ColorInput, NumberInput, SelectorInput, TextInput } from "../genericInputs";
import { FONT_FAMILIES } from "../../../data/StoreData";


/**
 * @typedef {{
 * selectedNodeID: number | null;
 * textPropertiesList: import("../../../store/properties/text").ITextPropertiesListState;
 * updateTextPropertiesAction: typeof updateTextPropertiesAction;
 * }} TextPropertiesComponentDependencies
 */

/**
 * @param { TextPropertiesComponentDependencies} props 
 */
const TextPropertiesComponent = ({ selectedNodeID, textPropertiesList, updateTextPropertiesAction }) => {

    const id = selectedNodeID;
    const textProperties = textPropertiesList[id];

    const onNumberValueChanged = (event) => {
        const key = event.target.getAttribute("data-id");
        const parsedValue = parseFloat(event.target.value);
        const value = !Number.isNaN(parsedValue) ? parsedValue : "";

        updateTextPropertiesAction({
            nodeID: id,
            properties: { ...textProperties, [key]: value }
        });
    };

    const onStringValueChanged = (event) => {
        const key = event.target.getAttribute("data-id");
        const value = event.target.value;

        updateTextPropertiesAction({
            nodeID: id,
            properties: { ...textProperties, [key]: value }
        });
    };

    const textData = {
        label: "Text",
        dataID: "text",
        value: textProperties.text,
        onChange: onStringValueChanged
    };

    const anchorData = {
        label: "Anchor",
        dataIDs: ["anchorX", "anchorY"],
        values: [textProperties.anchorX, textProperties.anchorY],
        signs: ["X", "Y"],
        onChange: onNumberValueChanged
    };

    const colorData = {
        label: "Color",
        dataID: "color",
        value: textProperties.color,
        onChange: onStringValueChanged
    };

    const fontSizeData = {
        label: "Size",
        dataID: "fontSize",
        value: textProperties.fontSize,
        sign: "Px",
        onChange: onNumberValueChanged
    };

    const fontFamilyData = {
        label: "Font",
        dataID: "fontFamily",
        selected: textProperties.fontFamily,
        options: Object.values(FONT_FAMILIES),
        onChange: onStringValueChanged
    };

    return (
        <div className="properties propertiesTopOffset">
            <TextInput {...textData} />
            <SelectorInput {...fontFamilyData} />
            <ColorInput {...colorData} />
            <NumberInput {...fontSizeData} />
            <PointInput {...anchorData} />
        </div>
    )
}

/**
 * @param {import("../../../store").IStore} data 
 */
const mapStateToProps = ({ tree, textPropertiesList }) => {
    return {
        selectedNodeID: tree.selectedNodeID,
        textPropertiesList
    }
};

export const TextProperties = connect(
    mapStateToProps,
    { updateTextPropertiesAction }
)(TextPropertiesComponent)
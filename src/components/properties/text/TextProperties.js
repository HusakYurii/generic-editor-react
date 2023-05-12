import React from "react";

import { connect } from "react-redux";
import { updateTextPropertiesAction } from "../../../store/properties/text";

import { PointInput } from "../genericInputs/PointInput";
import { ColorInput, NumberInput, SelectorInput, TextInput } from "../genericInputs";
import { FONT_FAMILIES, FONT_STYLE, FONT_VARIANT, FONT_WEIGHT } from "../../../data/StoreData";


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


    const textData = { label: "Text", dataID: "text", value: textProperties.text, onChange: onStringValueChanged };
    const colorData = { label: "Color", dataID: "color", value: textProperties.color, onChange: onStringValueChanged };
    const fontFamilyData = { label: "Font Family", dataID: "fontFamily", selected: textProperties.fontFamily, options: Object.values(FONT_FAMILIES), onChange: onStringValueChanged };
    const fontStyleData = { label: "Font Style", dataID: "fontStyle", selected: textProperties.fontStyle, options: Object.values(FONT_STYLE), onChange: onStringValueChanged };
    const fontVariantData = { label: "Font Variant", dataID: "fontVariant", selected: textProperties.fontVariant, options: Object.values(FONT_VARIANT), onChange: onStringValueChanged };
    const fontWeightData = { label: "Font Weight", dataID: "fontWeight", selected: textProperties.fontWeight, options: Object.values(FONT_WEIGHT), onChange: onStringValueChanged };
    const fontSizeData = { label: "Size", dataID: "fontSize", value: textProperties.fontSize, sign: "Px", onChange: onNumberValueChanged };

    const anchorData = { label: "Anchor", dataIDs: ["anchorX", "anchorY"], values: [textProperties.anchorX, textProperties.anchorY], signs: ["X", "Y"], onChange: onNumberValueChanged };

    return (
        <div className="properties propertiesTopOffset">
            <TextInput {...textData} />
            <ColorInput {...colorData} />
            <SelectorInput {...fontFamilyData} />
            <SelectorInput {...fontStyleData} />
            <SelectorInput {...fontVariantData} />
            <SelectorInput {...fontWeightData} />
            <NumberInput {...fontSizeData} />
            <br></br>
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
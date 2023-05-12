import React, { useRef, useEffect, useState } from "react";

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

    const inputsRef = useRef([]);

    const id = selectedNodeID;
    const textProperties = textPropertiesList[id];

    const onInputChange = (key, value) => {
        updateTextPropertiesAction({
            nodeID: id,
            properties: { ...textProperties, [key]: value }
        });
    };

    const textData = { label: "Text", dataID: "text", value: textProperties.text, onChange: onInputChange };
    const colorData = { label: "Color", dataID: "color", value: textProperties.color, onChange: onInputChange };
    const fontFamilyData = { label: "Font Family", dataID: "fontFamily", selected: textProperties.fontFamily, options: Object.values(FONT_FAMILIES), onChange: onInputChange };
    const fontStyleData = { label: "Font Style", dataID: "fontStyle", selected: textProperties.fontStyle, options: Object.values(FONT_STYLE), onChange: onInputChange };
    const fontVariantData = { label: "Font Variant", dataID: "fontVariant", selected: textProperties.fontVariant, options: Object.values(FONT_VARIANT), onChange: onInputChange };
    const fontWeightData = { label: "Font Weight", dataID: "fontWeight", selected: textProperties.fontWeight, options: Object.values(FONT_WEIGHT), onChange: onInputChange };
    const fontSizeData = { label: "Size", dataID: "fontSize", value: textProperties.fontSize, sign: "Px", onChange: onInputChange };

    const anchorData = { label: "Anchor", dataIDs: ["anchorX", "anchorY"], values: [textProperties.anchorX, textProperties.anchorY], signs: ["X", "Y"], onChange: onInputChange };

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
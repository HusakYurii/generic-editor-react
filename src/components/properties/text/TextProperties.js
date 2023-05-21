import React, { useState } from "react";

import { connect } from "react-redux";
import { updateTextPropertiesAction } from "../../../store/properties/text";

import { PointInput } from "../genericInputs/PointInput";
import { ColorInput, NumberInput, SelectorInput, TextInput } from "../genericInputs";
import { FONT_FAMILIES, FONT_LINE_JOINT, FONT_STYLE, FONT_VARIANT, FONT_WEIGHT, TEXT_ALIGN, TEXT_WHITE_SPACE } from "../../../data/StoreData";
import { ToggleInput } from "../genericInputs/ToggleInput";


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

    const {
        text, fill, anchorY, anchorX,
        fontFamily, fontStyle, fontVariant, fontWeight, fontSize,
        // stroke properties are optional and may not exist in the data if disabled
        hasStroke = false, stroke = "#ffffff", strokeThickness = 1, miterLimit = 10, lineJoin = FONT_LINE_JOINT.MITER,
        // shadow props are optional and may NOT exist in the data if disabled
        dropShadow = false, dropShadowAlpha = 1, dropShadowAngle = 0, dropShadowBlur = 0,
        dropShadowColor = "#ffffff", dropShadowDistance = 0,
        // multi-line props are optional and may NOT exist in the data if disabled
        wordWrap = false, breakWords = false, leading = 0, lineHeight = 0, wordWrapWidth = 200,
        align = TEXT_ALIGN.LEFT, whiteSpace = TEXT_WHITE_SPACE.PRE,
    } = textPropertiesList[id];;

    // if booleans are not provided it means that the callback is called from the input
    const onChange = (key, value, isStroke = hasStroke, isShadow = dropShadow, isMultiLine = wordWrap) => {
        let properties = {
            text, fill, anchorY, anchorX,
            fontFamily, fontStyle, fontVariant, fontWeight, fontSize,
            ...(isStroke ? { hasStroke: true, stroke, strokeThickness, miterLimit, lineJoin } : {}),
            ...(isShadow ? { dropShadow: true, dropShadowAlpha, dropShadowAngle, dropShadowBlur, dropShadowColor, dropShadowDistance } : {}),
            ...(isMultiLine ? { wordWrap: true, breakWords, leading, lineHeight, wordWrapWidth, align, whiteSpace } : {}),
        };

        properties[key] = value;

        updateTextPropertiesAction({ nodeID: id, properties });
    };

    // essential style values
    const textData = { label: "Text", dataID: "text", value: text, onChange };
    const anchorData = { label: "Anchor", dataIDs: ["anchorX", "anchorY"], values: [anchorX, anchorY], signs: ["X", "Y"], onChange };
    const colorData = { label: "Color", dataID: "fill", value: fill, onChange };
    const fontFamilyData = { label: "Font Family", dataID: "fontFamily", selected: fontFamily, options: Object.values(FONT_FAMILIES), onChange };
    const fontStyleData = { label: "Font Style", dataID: "fontStyle", selected: fontStyle, options: Object.values(FONT_STYLE), onChange };
    const fontVariantData = { label: "Font Variant", dataID: "fontVariant", selected: fontVariant, options: Object.values(FONT_VARIANT), onChange };
    const fontWeightData = { label: "Font Weight", dataID: "fontWeight", selected: fontWeight, options: Object.values(FONT_WEIGHT), onChange };
    const fontSizeData = { label: "Size", dataID: "fontSize", value: fontSize, sign: "Px", onChange };

    // stroke properties are optional and may not exist in the data if disabled
    const onStrokeToggled = (key, isStroke) => {
        // those two calls will make the component to rerender but I am sure React will make one repaint because of batching
        onChange("", "", isStroke, dropShadow, wordWrap);
    };

    const showStrokeProperties = () => {
        const strokeColorData = { label: "Color", dataID: "stroke", value: stroke, onChange };
        const strokeLineJoinData = { label: "Line Join", dataID: "lineJoin", selected: lineJoin, options: Object.values(FONT_LINE_JOINT), onChange };
        const strokeThicknessData = { label: "Thickness", dataID: "strokeThickness", value: strokeThickness, sign: "Px", onChange };
        const strokeMiterLimitData = { label: "Miter Limit", dataID: "miterLimit", value: miterLimit, sign: "Px", onChange };

        return (
            <>
                <ColorInput {...strokeColorData} />
                <SelectorInput {...strokeLineJoinData} />
                <NumberInput {...strokeThicknessData} />
                <NumberInput {...strokeMiterLimitData} />
            </>
        )
    };

    const onShadowToggled = (key, isShadow) => onChange("", "", hasStroke, isShadow, wordWrap);

    const showShadowProperties = () => {
        const dropShadowColorData = { label: "Color", dataID: "dropShadowColor", value: dropShadowColor, onChange };
        const dropShadowAlphaData = { label: "Alpha", dataID: "dropShadowAlpha", value: dropShadowAlpha, onChange };
        const dropShadowAngleData = { label: "Angle", dataID: "dropShadowAngle", value: dropShadowAngle, sign: "DEG", onChange };
        const dropShadowBlurData = { label: "Blur", dataID: "dropShadowBlur", value: dropShadowBlur, sign: "Px", onChange };
        const dropShadowDistanceData = { label: "Distance", dataID: "dropShadowDistance", value: dropShadowDistance, sign: "Px", onChange };

        return (
            <>
                <ColorInput {...dropShadowColorData} />
                <NumberInput {...dropShadowAlphaData} />
                <NumberInput {...dropShadowAngleData} />
                <NumberInput {...dropShadowBlurData} />
                <NumberInput {...dropShadowDistanceData} />
            </>
        )
    };

    const onMultiLineToggled = (key, isMultiLine) => onChange("", "", hasStroke, dropShadow, isMultiLine);

    const showMultiLineProperties = () => {
        const breakWordsData = { label: "Break Words", dataID: "breakWords", value: breakWords, onChange };
        const alignData = { label: "Align", dataID: "align", selected: align, options: Object.values(TEXT_ALIGN), onChange };
        const whiteSpaceData = { label: "White Space", dataID: "whiteSpace", selected: whiteSpace, options: Object.values(TEXT_WHITE_SPACE), onChange };
        const wordWrapWidthData = { label: "Wrap Width", dataID: "wordWrapWidth", value: wordWrapWidth, sign: "Px", onChange };
        const lineHeightData = { label: "Line Height", dataID: "lineHeight", value: lineHeight, sign: "Px", onChange };
        const leadingData = { label: "Leading", dataID: "leading", value: leading, sign: "Px", onChange };

        return (
            <>
                <ToggleInput {...breakWordsData} />
                <SelectorInput {...alignData} />
                <SelectorInput {...whiteSpaceData} />
                <NumberInput {...wordWrapWidthData} />
                <NumberInput {...lineHeightData} />
                <NumberInput {...leadingData} />
            </>
        )
    };

    return (
        <div className="properties propertiesTopOffset">
            <TextInput {...textData} />
            <PointInput {...anchorData} />
            <br></br>
            <ColorInput {...colorData} />
            <SelectorInput {...fontFamilyData} />
            <SelectorInput {...fontStyleData} />
            <SelectorInput {...fontVariantData} />
            <SelectorInput {...fontWeightData} />
            <NumberInput {...fontSizeData} />
            <br></br>
            <ToggleInput {...{ label: "Stroke", dataID: "", value: hasStroke, onChange: onStrokeToggled }} />
            {hasStroke ? showStrokeProperties() : null}
            <br></br>
            <ToggleInput {...{ label: "Shadow", dataID: "", value: dropShadow, onChange: onShadowToggled }} />
            {dropShadow ? showShadowProperties() : null}
            <br></br>
            <ToggleInput {...{ label: "Multiline", dataID: "", value: wordWrap, onChange: onMultiLineToggled }} />
            {wordWrap ? showMultiLineProperties() : null}
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
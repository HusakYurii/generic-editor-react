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

    const [useStroke, toggleStrokeProps] = useState(false);
    const [useShadow, toggleShadowProps] = useState(false);
    const [useMultiLine, toggleMultiLineProps] = useState(false);

    const id = selectedNodeID;
    const textProperties = textPropertiesList[id];
    const {
        text, color, anchorY, anchorX,
        fontFamily, fontStyle, fontVariant, fontWeight,
        fontSize,
        // stroke properties are optional and may not exist in the data if disabled
        stroke = "#ffffff", strokeThickness = 1, miterLimit = 10, lineJoin = FONT_LINE_JOINT.MITER,
        // shadow props are optional and may NOT exist in the data if disabled
        dropShadowAlpha = 1, dropShadowAngle = 0, dropShadowBlur = 0, dropShadowColor = "#ffffff", dropShadowDistance = 0,
        // multi-line props are optional and may NOT exist in the data if disabled
        wordWrap = true,
        breakWords = false,
        leading = 0,
        lineHeight = 0,
        wordWrapWidth = 200,
        align = TEXT_ALIGN.LEFT,
        whiteSpace = TEXT_WHITE_SPACE.PRE,

    } = textProperties;

    // if booleans are not provided it means that the callback is called from the input
    const onInputChange = (key, value, isStroke = useStroke, isShadow = useShadow, isMultiLine = useMultiLine) => {
        let properties = {
            text, color, anchorY, anchorX,
            fontFamily, fontStyle, fontVariant, fontWeight,
            fontSize
        };

        if (isStroke) {
            properties = { ...properties, stroke, strokeThickness, miterLimit, lineJoin };
        };

        if (isShadow) {
            properties = { ...properties, dropShadowAlpha, dropShadowAngle, dropShadowBlur, dropShadowColor, dropShadowDistance };
        }

        if (isMultiLine) {
            properties = { ...properties, wordWrap, breakWords, leading, lineHeight, wordWrapWidth, align, whiteSpace };
        }

        properties[key] = value;

        updateTextPropertiesAction({ nodeID: id, properties });
    };

    // essential style values
    const textData = { label: "Text", dataID: "text", value: text, onChange: onInputChange };
    const anchorData = { label: "Anchor", dataIDs: ["anchorX", "anchorY"], values: [anchorX, anchorY], signs: ["X", "Y"], onChange: onInputChange };
    const colorData = { label: "Color", dataID: "color", value: color, onChange: onInputChange };
    const fontFamilyData = { label: "Font Family", dataID: "fontFamily", selected: fontFamily, options: Object.values(FONT_FAMILIES), onChange: onInputChange };
    const fontStyleData = { label: "Font Style", dataID: "fontStyle", selected: fontStyle, options: Object.values(FONT_STYLE), onChange: onInputChange };
    const fontVariantData = { label: "Font Variant", dataID: "fontVariant", selected: fontVariant, options: Object.values(FONT_VARIANT), onChange: onInputChange };
    const fontWeightData = { label: "Font Weight", dataID: "fontWeight", selected: fontWeight, options: Object.values(FONT_WEIGHT), onChange: onInputChange };
    const fontSizeData = { label: "Size", dataID: "fontSize", value: fontSize, sign: "Px", onChange: onInputChange };
    // stroke properties are optional and may not exist in the data if disabled

    const onStrokeToggled = (key, value) => {
        // those two calls will make the component to rerender but I am sure React will make one repaint because of batching
        onInputChange("", "", value, useShadow, useMultiLine);
        toggleStrokeProps(value);
    };

    const showStrokeProperties = () => {
        const strokeColorData = { label: "Color", dataID: "stroke", value: stroke, onChange: onInputChange };
        const strokeLineJoinData = { label: "Line Join", dataID: "lineJoin", selected: lineJoin, options: Object.values(FONT_LINE_JOINT), onChange: onInputChange };
        const strokeThicknessData = { label: "Thickness", dataID: "strokeThickness", value: strokeThickness, sign: "Px", onChange: onInputChange };
        const strokeMiterLimitData = { label: "Miter Limit", dataID: "miterLimit", value: miterLimit, sign: "Px", onChange: onInputChange };

        return (
            <>
                <ColorInput {...strokeColorData} />
                <SelectorInput {...strokeLineJoinData} />
                <NumberInput {...strokeThicknessData} />
                <NumberInput {...strokeMiterLimitData} />
            </>
        )
    };

    const onShadowToggled = (key, value) => {
        onInputChange("", "", useStroke, value, useMultiLine);
        toggleShadowProps(value);
    };

    const showShadowProperties = () => {
        const dropShadowColorData = { label: "Color", dataID: "dropShadowColor", value: dropShadowColor, onChange: onInputChange };
        const dropShadowAlphaData = { label: "Alpha", dataID: "dropShadowAlpha", value: dropShadowAlpha, onChange: onInputChange };
        const dropShadowAngleData = { label: "Angle", dataID: "dropShadowAngle", value: dropShadowAngle, sign: "DEG", onChange: onInputChange };
        const dropShadowBlurData = { label: "Blur", dataID: "dropShadowBlur", value: dropShadowBlur, sign: "Px", onChange: onInputChange };
        const dropShadowDistanceData = { label: "Distance", dataID: "dropShadowDistance", value: dropShadowDistance, sign: "Px", onChange: onInputChange };

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


    const onMultiLineToggled = (key, value) => {
        onInputChange("", "", useStroke, useShadow, value);
        toggleMultiLineProps(value);
    };

    const showMultiLineProperties = () => {
        const breakWordsData = { label: "Break Words", dataID: "breakWords", value: breakWords, onChange: onInputChange };
        const alignData = { label: "Align", dataID: "align", selected: align, options: Object.values(TEXT_ALIGN), onChange: onInputChange };
        const whiteSpaceData = { label: "White Space", dataID: "whiteSpace", selected: whiteSpace, options: Object.values(TEXT_WHITE_SPACE), onChange: onInputChange };
        const wordWrapWidthData = { label: "Wrap Width", dataID: "wordWrapWidth", value: wordWrapWidth, sign: "Px", onChange: onInputChange };
        const lineHeightData = { label: "Line Height", dataID: "lineHeight", value: lineHeight, sign: "Px", onChange: onInputChange };
        const leadingData = { label: "Leading", dataID: "leading", value: leading, sign: "Px", onChange: onInputChange };

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
            <ToggleInput {...{ label: "Stroke", dataID: "", value: useStroke, onChange: onStrokeToggled }} />
            {useStroke ? showStrokeProperties() : null}
            <br></br>
            <ToggleInput {...{ label: "Shadow", dataID: "", value: useShadow, onChange: onShadowToggled }} />
            {useShadow ? showShadowProperties() : null}
            <br></br>
            <ToggleInput {...{ label: "Multiline", dataID: "", value: useMultiLine, onChange: onMultiLineToggled }} />
            {useMultiLine ? showMultiLineProperties() : null}
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
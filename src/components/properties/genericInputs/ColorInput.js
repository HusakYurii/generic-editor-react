import React from "react";

/**
 * @typedef {{
 *  label: string;
 *  dataID: string;
 *  value: string;
 *  onChange: (dataID: string, colorCode: string) => void;
 * }} ColorInputDependencies
 */

/**
 * @param {ColorInputDependencies} props
 */
export const ColorInput = ({ label, value, onChange, dataID }) => {

    const onColorChange = (event) => onChange(dataID, event.target.value);

    return (
        <div className="flexRow">
            <span className="colorGray textLeft widthOneThird">{label}</span>
            <input className="widthTwoThird" type="color" data-id={dataID} value={value} onChange={onColorChange} />
        </div>
    );
}
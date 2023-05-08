import React from "react";

/**
 * @typedef {{
 *  label: string;
 *  dataID?: string;
 *  value: string;
 *  onChange: (event: InputEvent) => void;
 * }} ColorInputDependencies
 */

/**
 * @param {ColorInputDependencies} props
 */
export const ColorInput = ({ label, value, onChange, dataID = "" }) => {

    return (
        <div className="flexRow">
            <span className="colorWhite textLeft widthOneThird">{label}</span>
            <input className="widthTwoThird" type="color" data-id={dataID} value={value} onChange={onChange} />
        </div>
    );
}
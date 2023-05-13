import React from "react";


/**
 * @typedef {{
 *  label: string;
 *  dataID: string;
 *  value: string;
 *  onChange: (dataID: string, value: number | string) => void;
 * }} ToggleInputDependencies
 */

/**
 * @param {ToggleInputDependencies} props
 */
export const ToggleInput = ({ label, value, onChange, dataID }) => {

    const onInputChange = (event) => {
        onChange(dataID, event.target.checked);
    };

    return (
        <div className="flexRow justifyContentStart">
            <span className="textLeft colorGray widthOneThird">{label}</span>
            <input
                type="checkbox"
                data-id={dataID}
                value={value}
                onChange={onInputChange}
            />
        </div>
    );
}
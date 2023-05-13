import React from "react";

/**
 * @typedef {{
 *  label: string;
 *  selected: string;
 *  options: string[];
 *  onChange: (dataID: string, value: string) => void;
 *  dataID: string;
 * }} SelectorInputDependencies
 */

/**
 * @param {SelectorInputDependencies} props
 */
export const SelectorInput = ({ label, selected, options, onChange, dataID }) => {

    const onInputChange = (event) => onChange(dataID, event.target.value);

    return (
        <div className="flexRow">
            <span className="textLeft colorGray widthOneThird">{label}</span>
            <select data-id={dataID} value={selected} onChange={onInputChange} className="widthTwoThird">
                {options.map((option) => {
                    return <option key={option} value={option}>{option}</option>
                })}
            </select>
        </div>
    );
}
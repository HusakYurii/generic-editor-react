import React from "react";

/**
 * @typedef {{
 *  label: string;
 *  selected: string;
 *  options: string[];
 *  onChange: (event: InputEvent) => void;
 *  dataID?: string;
 * }} SelectorInputDependencies
 */

/**
 * @param {SelectorInputDependencies} props
 */
export const SelectorInput = ({ label, selected, options, onChange, dataID = "" }) => {

    return (
        <div className="flexRow">
            <span className="textLeft colorGray widthOneThird">{label}</span>
            <select data-id={dataID} value={selected} onChange={onChange} className="widthTwoThird">
                {options.map((option) => {
                    return <option key={option} value={option}>{option}</option>
                })}
            </select>
        </div>
    );
}
import React from "react";

/**
 * @typedef {{
 *  label: string;
 *  selected: string;
 *  options: string[];
 *  onChange: (event: InputEvent) => void;
 * }} SelectorInputDependencies
 */

/**
 * @param {SelectorInputDependencies} props
 */
export const SelectorInput = ({ label, selected, options, onChange }) => {

    return (
        <div className="flexRow">
            <span className="textLeft colorWhite widthOneThird">{label}</span>
            <select value={selected} onChange={onChange} className="widthTwoThird">
                {options.map((option) => {
                    return <option key={option} value={option}>{option}</option>
                })}
            </select>
        </div>
    );
}
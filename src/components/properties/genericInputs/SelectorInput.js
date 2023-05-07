import React from "react";

const style = {
    div: {
        display: "flex",
        flexDirection: "row",
        marginTop: "4px"
    },

    label: {
        color: "white",
        textAlign: "left",
        width: "33%"

    },
    element: {
        textAlign: "left",
        width: "66%"
    }
};

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
        <div style={{ ...style.div }}>
            <span style={{ ...style.label }}>{label}</span>
            <select value={selected} onChange={onChange} style={{ ...style.element }}>
                {options.map((option) => {
                    return <option key={option} value={option}>{option}</option>
                })}
            </select>
        </div>
    );
}
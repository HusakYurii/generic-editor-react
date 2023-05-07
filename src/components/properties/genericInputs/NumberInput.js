import React from "react";

const style = {
    div: {
        display: "flex",
        flexDirection: "row",
        marginTop: "4px"
    },

    label: {
        color: "white",

    },
    element: {
        textAlign: "left",
        width: "33%"
    }
};

/**
 * @typedef {{
 *  label: string;
 *  dataID?: string;
 *  step?: number;
 *  value: number;
 *  onChange: (event: InputEvent) => void;
 * }} NumberInputDependencies
 */

/**
 * @param {NumberInputDependencies} props
 */
export const NumberInput = ({ label, value, step = 1, dataID = "", onChange }) => {

    return (
        <div style={{ ...style.div }}>
            <span style={{ ...style.label, ...style.element }}>{label}</span>
            <input type="number" data-id={dataID} step={step} value={value} onChange={onChange} style={{ ...style.element }} />
        </div>
    );
}
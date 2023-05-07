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
        width: "66%"
    }
};

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
        <div style={{ ...style.div }}>
            <span style={{ ...style.label }}>{label}</span>
            <input type="color" data-id={dataID} value={value} onChange={onChange} style={{ ...style.element }} />
        </div>
    );
}
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
 *  dataID?: string;
 *  value: string;
 *  onChange: (event: InputEvent) => void;
 * }} TextValueInputDependencies
 */

/**
 * @param {TextValueInputDependencies} props
 */
export const TextValueInput = ({ label, value, onChange, dataID = "" }) => {

    return (
        <div style={{ ...style.div }}>
            <span style={{ ...style.label, ...style.element }}>{label}</span>
            <input type="text" data-id={dataID} value={value} onChange={onChange} style={{ ...style.element }} />
        </div>
    );
}
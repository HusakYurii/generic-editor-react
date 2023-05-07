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
 *  dataIDs?: [string, string];
 *  values: [number, number];
 *  step?: number;
 *  onChange: (event: InputEvent) => void;
 * }} PointInputDependencies
 */

/**
 * @param {PointInputDependencies} props
 */
export const PointInput = ({ label, values, onChange, step = 1, dataIDs = ["", ""] }) => {

    return (
        <div style={{ ...style.div }}>
            <span style={{ ...style.label, ...style.element }}>{label}</span>
            <input type="number" data-id={dataIDs[0]} step={step} value={values[0]} onChange={onChange} style={{ ...style.element }} />
            <input type="number" data-id={dataIDs[1]} step={step} value={values[1]} onChange={onChange} style={{ ...style.element }} />
        </div>
    );
}
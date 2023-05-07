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
 *  min?: number;
 *  max?: number;
 *  step?: number;
 *  middleware?: (event: InputEvent) => InputEvent;
 *  onChange: (event: InputEvent) => void;
 * }} PointInputDependencies
 */

/**
 * @param {PointInputDependencies} props
 */
export const PointInput = ({
    label,
    values,
    onChange,
    min = -1e6,
    max = 1e6,
    step = 0.5,
    dataIDs = ["", ""],
    middleware = (event) => event
}) => {

    return (
        <div style={{ ...style.div }}>
            <span style={{ ...style.label, ...style.element }}>{label}</span>
            <input
                type="number"
                data-id={dataIDs[0]}
                min={min}
                max={max}
                step={step}
                value={values[0]}
                onChange={(e) => onChange(middleware(e))}
                style={{ ...style.element }} />

            <input
                type="number"
                data-id={dataIDs[1]}
                min={min}
                max={max}
                step={step}
                value={values[1]}
                onChange={(e) => onChange(middleware(e))}
                style={{ ...style.element }} />
        </div>
    );
}
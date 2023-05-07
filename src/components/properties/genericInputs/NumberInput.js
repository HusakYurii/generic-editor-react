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
 *  min?: number;
 *  max?: number;
 *  value: number;
 *  middleware?: (event: InputEvent) => InputEvent;
 *  onChange: (event: InputEvent) => void;
 * }} NumberInputDependencies
 */

/**
 * @param {NumberInputDependencies} props
 */
export const NumberInput = ({
    label,
    value,
    onChange,
    min = -1e6,
    max = 1e6,
    step = 0.5,
    dataID = "",
    middleware = (event) => event
}) => {

    return (
        <div style={{ ...style.div }}>
            <span style={{ ...style.label, ...style.element }}>{label}</span>
            <input
                type="number"
                data-id={dataID}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(middleware(e))}
                style={{ ...style.element }} />
        </div>
    );
}
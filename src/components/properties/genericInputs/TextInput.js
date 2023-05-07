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
 *  middleware?: (event: InputEvent) => InputEvent;
 *  onChange: (event: InputEvent) => void;
 * }} TextInputDependencies
 */

/**
 * @param {TextInputDependencies} props
 */
export const TextInput = ({ label, value, onChange, dataID = "", middleware = (event) => event }) => {

    return (
        <div style={{ ...style.div }}>
            <span style={{ ...style.label, ...style.element }}>{label}</span>
            <input
                type="text"
                data-id={dataID}
                value={value}
                onChange={(e) => onChange(middleware(e))}
                style={{ ...style.element }} />
        </div>
    );
}
import React from "react";


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
        <div className="flexRow">
            <span className="textLeft colorWhite widthOneThird">{label}</span>
            <input
                className="widthTwoThird"
                type="text"
                data-id={dataID}
                value={value}
                onChange={(e) => onChange(middleware(e))}
            />
        </div>
    );
}
import React from "react";


/**
 * @typedef {{
 *  label: string;
 *  dataID?: string;
 *  value: string;
 *  className?: string;
 *  middleware?: (event: InputEvent) => InputEvent;
 *  onBlur?: (event: InputEvent) => InputEvent;
 *  onChange: (event: InputEvent) => void;
 * }} TextInputDependencies
 */

/**
 * @param {TextInputDependencies} props
 */
export const TextInput = ({
    label,
    value,
    onChange,
    dataID = "",
    className = "",
    onBlur = (e) => e,
    middleware = (e) => e
}) => {

    return (
        <div className="flexRow">
            <span className="textLeft colorGray widthOneThird">{label}</span>
            <input
                className={`widthTwoThird ${className}`}
                type="text"
                data-id={dataID}
                value={value}
                onBlur={onBlur}
                onChange={(e) => onChange(middleware(e))}
            />
        </div>
    );
}
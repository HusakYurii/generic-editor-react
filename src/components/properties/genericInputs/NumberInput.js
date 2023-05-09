import React from "react";

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
        <div className="flexRow">
            <span className="textLeft colorGray widthOneThird">{label}</span>
            <input
                className="widthOneThird"
                type="number"
                data-id={dataID}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(middleware(e))}
            />
            {/* placeholder to make it aligned with the other elements */}
            <span className="widthOneThird"></span>
        </div>
    );
}
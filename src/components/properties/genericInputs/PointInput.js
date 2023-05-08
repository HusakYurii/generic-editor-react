import React from "react";

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
        <div className="flexRow">
            <span className="textLeft colorWhite widthOneThird">{label}</span>
            <input
                className="widthOneThird"
                type="number"
                data-id={dataIDs[0]}
                min={min}
                max={max}
                step={step}
                value={values[0]}
                onChange={(e) => onChange(middleware(e))}
            />

            <input
                className="widthOneThird"
                type="number"
                data-id={dataIDs[1]}
                min={min}
                max={max}
                step={step}
                value={values[1]}
                onChange={(e) => onChange(middleware(e))}
            />
        </div>
    );
}
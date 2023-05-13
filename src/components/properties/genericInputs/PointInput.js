import React from "react";
import { parseNumberMiddleware } from ".";

/**
 * @typedef {{
 *  label: string;
 *  dataIDs: [string, string];
 *  values: [number, number];
 *  step?: number;
 *  signs? : string[]; // are  used for UI
 *  middleware?: (event: InputEvent) => InputEvent;
 *  onChange: (dataID: string, value: number | string) => void;
 * }} PointInputDependencies
 */

/**
 * @param {PointInputDependencies} props
 */
export const PointInput = ({
    label,
    values,
    onChange,
    dataIDs,
    step = 0.5,
    signs = ["", ""],
    middleware = (event) => event
}) => {

    const onInputChange = (event) => {
        event = middleware(event);
        const [key, value] = parseNumberMiddleware(event);
        onChange(key, value)
    };

    return (
        <div className="flexRow">
            <span className="textLeft colorGray widthOneThird">{label}</span>
            {[0, 1].map((i) => {
                return (<div key={i} data-sign={signs[i]} className="widthOneThird positionRelative inputAfterElement">
                    <input
                        className="widthFull"
                        type="number"
                        data-id={dataIDs[i]}
                        step={step}
                        value={values[i]}
                        onChange={onInputChange}
                    />
                </div>)
            })}
        </div>
    );
}
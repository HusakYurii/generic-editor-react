import React from "react";

/**
 * @typedef {{
 *  label: string;
 *  dataIDs?: [string, string];
 *  values: [number, number];
 *  step?: number;
 *  signs? : string[]; // are  used for UI
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
    step = 0.5,
    signs = ["", ""],
    dataIDs = ["", ""],
    middleware = (event) => event
}) => {

    return (
        <div className="flexRow">
            <span className="textLeft colorGray widthOneThird">{label}</span>
            {[0, 1].map((i) => {
                return (<div data-sign={signs[i]} className="widthOneThird positionRelative inputAfterElement">
                    <input
                        className="widthFull"
                        type="number"
                        data-id={dataIDs[i]}
                        step={step}
                        value={values[i]}
                        onChange={(e) => onChange(middleware(e))}
                    />
                </div>)
            })}
            {/* <div data-sign={signs[0]} className="widthOneThird positionRelative inputAfterElement">
                <input
                    className="widthFull"
                    type="number"
                    data-id={dataIDs[0]}
                    step={step}
                    value={values[0]}
                    onChange={(e) => onChange(middleware(e))}
                />
            </div>
            <div data-sign={signs=[1]} className="widthOneThird positionRelative inputAfterElement">
                <input
                    className="widthFull"
                    type="number"
                    data-id={dataIDs[1]}
                    step={step}
                    value={values[1]}
                    onChange={(e) => onChange(middleware(e))}
                />
            </div > */}
        </div>
    );
}
import React from "react";
import { parseNumberMiddleware } from ".";

/**
 * @typedef {{
 *  label: string;
 *  dataID: string;
 *  step?: number;
 *  sign? : sting; // is used for UI to
 *  value: number;
 *  middleware?: (event: InputEvent) => InputEvent;
 *  onChange: (dataID: string, value: number | string) => void;
 * }} NumberInputDependencies
 */

/**
 * @param {NumberInputDependencies} props
 */
export const NumberInput = ({
    label,
    value,
    onChange,
    dataID,
    step = 0.5,
    sign = "",
    middleware = (event) => event
}) => {

    const onInputChange = (event) => {
        event = middleware(event);
        const [key, value] = parseNumberMiddleware(event);
        onChange(key, value);
    };

    return (
        <div className="flexRow">
            <span className="textLeft colorGray widthOneThird">{label}</span>
            <div data-sign={sign} className="widthOneThird positionRelative inputAfterElement">
                <input
                    className="widthFull"
                    type="number"
                    data-id={dataID}
                    step={step}
                    value={value}
                    onChange={onInputChange}
                />
            </div>

            {/* placeholder to make it aligned with the other elements */}
            <span className="widthOneThird"></span>
        </div>
    );
}
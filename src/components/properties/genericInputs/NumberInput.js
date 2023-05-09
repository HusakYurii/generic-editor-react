import React from "react";

/**
 * @typedef {{
 *  label: string;
 *  dataID?: string;
 *  step?: number;
 *  sign? : sting; // is used for UI to
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
    step = 0.5,
    dataID = "",
    sign = "",
    middleware = (event) => event
}) => {

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
                    onChange={(e) => onChange(middleware(e))}
                />
            </div>

            {/* placeholder to make it aligned with the other elements */}
            <span className="widthOneThird"></span>
        </div>
    );
}
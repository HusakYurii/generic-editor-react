import React from "react";

/**
 * @typedef {{
 *  label: string;
 *  value: string;
 *  dataID?: string;
 *  onChange: (resourceID: number) => void;
 * }} TextureInputDependencies
 */

/**
 * Is used for a single texture only
 * @param {TextureInputDependencies} props
 */
export const TextureInput = ({
    label,
    value,
    onChange,
    dataID = "",
}) => {

    /* for some reason preventDefault() has to be used otherwise onDrop event will not work */
    const onDragOver = (event) => event.preventDefault();
    const onDragEnter = ({ target }) => target.classList.add("dragOver");
    const onDragLeave = ({ target }) => target.classList.remove("dragOver");

    const onDrop = (event) => {
        onDragLeave(event);

        // @TODO find another way of doing it. I tried to add it to the dataTransfer.items, but it didn't work
        if (!window["__RESOURCE_ID"]) { return; }
        const resourceID = window["__RESOURCE_ID"];
        delete window["__RESOURCE_ID"];

        onChange(resourceID);
    };

    return (
        <div className="flexRow">
            <span className="textLeft colorGray widthOneThird">{label}</span>
            <textarea
                className="textureInput"
                disabled
                value={value}
                data-id={dataID}
                onDragOver={onDragOver}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            ></textarea>
        </div>
    );
}
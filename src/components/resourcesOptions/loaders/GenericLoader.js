import React from "react";

/**
 * @typedef {{
 *  onLoaded: (files: File[]) => void;
 *  type: string;
 * }} ImageLoaderComponentDependencies
 */

/**
 * @param { ImageLoaderComponentDependencies} props 
 */
const ImageLoaderComponent = (props) => {
    const onChange = (event) => {
        const files = event.target.files ? Object.values(event.target.files) : []
        props.onLoaded(files);
    };

    return (
        <input
            type="file"
            multiple
            accept={props.type}
            style={{ display: "none" }}
            onChange={onChange}
        ></input>
    )
}

export const ImageLoader = ImageLoaderComponent
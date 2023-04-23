import React from "react";

import "./imageElement.css";

/**
 * @typedef {{
 * resource: {url: string, name: string};
 * id: number;
 * }} ImageElementComponentDependencies
 */

/**
 * @param { ImageElementComponentDependencies} props 
 */
const ImageElementComponent = (props) => {
    return (
        <div className="image-preview">
            <img src={props.resource.url}></img>
            <p>{props.resource.name}</p>
        </div>
    )
}

export const ImageElement = ImageElementComponent
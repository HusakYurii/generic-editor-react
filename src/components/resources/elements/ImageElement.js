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
        <div id={props.id} className="image-preview" data-type="image-preview" style={{ backgroundImage: `url(${props.resource.url})` }}>
            {props.resource.name}
        </div>
    )
}

export const ImageElement = ImageElementComponent
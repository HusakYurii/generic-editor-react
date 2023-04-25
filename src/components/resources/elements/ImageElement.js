import React, { useState } from "react";

import "./imageElement.css";
import { convertFileToBase64 } from "../../../tools/resourcesTools";

/**
 * @typedef {{
 * resource: File;
 * id: number;
 * }} ImageElementComponentDependencies
 */

/**
 * @param { ImageElementComponentDependencies} props 
 */
const ImageElementComponent = (props) => {
    const [parsedResource, setParsedResource] = useState({
        url: "",
        name: "Loading..."
    });

    convertFileToBase64(props.resource, setParsedResource);

    return (
        <div id={props.id} className="image-preview" data-type="image-preview" style={{ backgroundImage: `url(${parsedResource.url})` }}>
            {parsedResource.name}
        </div>
    )
}

export const ImageElement = ImageElementComponent
import React from "react"
import { TextInput } from "../Inputs";

import "./typeProperty.css";

/**
 * @param {{node: import("../../../../data/NodeData").INodeData}} props 
 */
export const TypeProperty = ({ node }) => {
    return (
        <div id="type-property">
            {/* the element below uses styles from baseProperties.css */}
            <div id="name-property">
                <div className="property-title"><p>Type</p></div>
                <div className="property-inputs full-with">
                    <TextInput {...{
                        value: node.type,
                        disabled: true,
                        onChange: (value) => { }
                    }} />
                </div>
            </div>
        </div>
    );
}
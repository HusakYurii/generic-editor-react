import React from "react";


import { NameProperty } from "./NameProperty";
import { BaseProperties } from "./BaseProperties";
import { SpriteProperties } from "./SpriteProperties"

import "./propertiesPanel.css";

export const PropertiesPanel = () => {
    return (
        <div>
            <NameProperty />
            <BaseProperties />
            <SpriteProperties />
        </div>
    )
}
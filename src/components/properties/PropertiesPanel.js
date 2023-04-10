import React from "react";

import { NameProperty } from "./NameProperty";
import { BaseProperties } from "./BaseProperties";

import "./propertiesPanel.css";

export const PropertiesPanel = () => {
    return (
        <div>
            <NameProperty />
            <BaseProperties />
        </div>
    )
}
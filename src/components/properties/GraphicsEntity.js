import React from "react";
import { NameProperty } from "./name";
import { BaseProperties } from "./base";
import { ENTITY_TYPES } from "../../data/StoreData";
import { GraphicsTypeSelector } from "./graphics/GraphicsTypeSelector";

/**
 * @param {number} id 
 * @param {import("../../store").IStore} store 
 */
export const isGraphicsEntity = (id, store) => {
    const entity = store.entityTypesList[id];
    return entity && entity.type === ENTITY_TYPES.GRAPHICS;
};

export const GraphicsEntity = () => {
    return (
        <div>
            <NameProperty />
            <BaseProperties />
            <GraphicsTypeSelector />
        </div>
    )
}
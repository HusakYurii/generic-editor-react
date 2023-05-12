import React from "react";
import { NameProperty } from "./name";
import { BaseProperties } from "./base";
import { ENTITY_TYPES } from "../../data/StoreData";
import { TextProperties } from "./text/TextProperties";

/**
 * @param {number} id 
 * @param {import("../../store").IStore} store 
 */
export const isTextEntity = (id, store) => {
    const entity = store.entityTypesList[id];
    return entity && entity.type === ENTITY_TYPES.TEXT;
};

export const TextEntity = () => {
    return (
        <div>
            <NameProperty />
            <BaseProperties />
            <TextProperties />
        </div>
    )
};
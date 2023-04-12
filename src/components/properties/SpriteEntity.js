import React from "react";
import { NameProperty } from "./name";
import { BaseProperties } from "./base";
import { SpriteProperties } from "./sprite/SpriteProperties";
import { ENTITY_TYPES } from "../../data/StoreData";

/**
 * @param {number} id 
 * @param {import("../../store").IStore} store 
 */
export const isSpriteEntity = (id, store) => {
    const entity = store.entityTypesList[id];
    return entity && entity.type === ENTITY_TYPES.SPRITE;
};

export const SpriteEntity = () => {
    return (
        <div>
            <NameProperty />
            <BaseProperties />
            <SpriteProperties />
        </div>
    )
}
import React from "react";
import { NameProperty } from "./name";
import { BaseProperties } from "./base";
import { ENTITY_TYPES } from "../../data/StoreData";
import { NineSliceSpriteProperties } from "./nineSliceSprite/NineSliceSpriteProperties";

/**
 * @param {number} id 
 * @param {import("../../store").IStore} store 
 */
export const isNineSliceSpriteEntity = (id, store) => {
    const entity = store.entityTypesList[id];
    return entity && entity.type === ENTITY_TYPES.NINE_SLICE_SPRITE;
};

export const NineSliceSpriteEntity = () => {
    return (
        <div>
            <NameProperty />
            <BaseProperties />
            <NineSliceSpriteProperties />
        </div>
    )
}
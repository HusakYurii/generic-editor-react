import React from "react";
import { NameProperty } from "./name";
import { BaseProperties } from "./base";
import { ENTITY_TYPES } from "../../data/StoreData";

/**
 * @param {number} id 
 * @param {import("../../store").IStore} store 
 */
export const isContainerEntity = (id, store) => {
    const entity = store.entityTypesList[id];
    return entity && entity.type === ENTITY_TYPES.CONTAINER;
};

export const ContainerEntity = () => {
    return (
        <div>
            <NameProperty />
            <BaseProperties />
        </div>
    )
}
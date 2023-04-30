export const ROOT_NODE_ID = 1;

// I haven't decided if the editor will support some extra COMPONENTS like collision  box or mask etc
export const AVAILABLE_COMPONENTS = {
    MASK: "MASK",
    HIT_AREA: "HIT_AREA"
};

export const ENTITY_TYPES = {
    CONTAINER: "CONTAINER",
    SPRITE: "SPRITE",

    // TEXT: "TEXT",
    // ANIMATED_SPRITE: "ANIMATED_SPRITE",
    // GRAPHICS: "GRAPHICS"
}


/**
 * 
 * @param {number} id 
 * @param {keyof ENTITY_TYPES} type 
 * @param {Array<keyof AVAILABLE_COMPONENTS>} properties 
 */
export const getEntityType = (id, type, components = []) => {
    return {
        [id]: {
            type,
            components
        }
    }
}

export const getBaseProperties = (id) => {
    return {
        [id]: {
            position: { x: 0, y: 0 },
            scale: { x: 1, y: 1 },
            rotation: 0,
        }
    }
};

export const getSpriteProperties = (id) => {
    return {
        [id]: {
            anchor: { x: 0, y: 0 },
            resourceID: null
        }
    }
};
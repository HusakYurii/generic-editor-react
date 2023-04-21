export const ROOT_NODE_ID = 1;

// I haven't decided if the editor will support some extra props like collision  box or mask etc
export const AVAILABLE_PROPERTIES_LIST = {
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
 * @param {Array<keyof AVAILABLE_PROPERTIES_LIST>} properties 
 */
export const getEntityType = (id, type, properties = []) => {
    return {
        [id]: {
            type,
            properties
        }
    }
}

export const getBaseProperties = (id) => {
    return {
        [id]: {
            position: { x: 0, y: 0 },
            scale: { x: 0, y: 0 },
            rotation: 0,
        }
    }
};

export const getSpriteProperties = (id) => {
    return {
        [id]: {
            anchor: { x: 0, y: 0 },
            textureName: ""
        }
    }
};
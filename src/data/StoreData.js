export const ROOT_NODE_ID = 1;

export const AVAILABLE_PROPERTIES_LIST = {
    BASE: "BASE",
    SPRITE: "SPRITE"
};

export const ENTITY_TYPES = {
    CONTAINER: "CONTAINER",
    SPRITE: "SPRITE"
}


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
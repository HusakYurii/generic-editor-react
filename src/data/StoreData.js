export const ROOT_NODE_ID = 1;

// I haven't decided if the editor will support some extra COMPONENTS like collision  box or mask etc
export const AVAILABLE_COMPONENTS = Object.freeze({
    MASK: "MASK",
    HIT_AREA: "HIT_AREA"
});

export const ENTITY_TYPES = Object.freeze({
    CONTAINER: "CONTAINER",
    SPRITE: "SPRITE",
    GRAPHICS: "GRAPHICS"


    // TEXT: "TEXT",
    // ANIMATED_SPRITE: "ANIMATED_SPRITE",
});

export const GRAPHICS_TYPES = Object.freeze({
    RECTANGLE: "RECTANGLE",
    ROUNDED_RECTANGLE: "ROUNDED_RECTANGLE",
    CIRCLE: "CIRCLE"
});

// @TODO remove the id from each property, it is an overhead
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


// GRAPHICS ================================== 
/**
 * @typedef {{ 
 * x: number;
 * y: number; 
 * color: number; 
 * alpha: number; 
 * }} IBaseGraphicsProperties;
 */

/**
 * @typedef {{ width: number; height: number; } & IBaseGraphicsProperties} IRectangleProperties;
 */

/**
 * @typedef {{ cornerRadius: number; } & IRectangleProperties } IRoundedRectangleProperties;
 */

/**
 * @typedef {{ radius: number; } & IBaseGraphicsProperties} ICircleProperties;
 */

/**
 * @typedef {IRectangleProperties | IRoundedRectangleProperties | ICircleProperties} IGraphicsPropertiesCombination;
 */

/**
 * @type IBaseGraphicsProperties
 */
const baseGraphicsProps = {
    x: 0,
    y: 0,
    color: "0x000000",
    alpha: 1
};

/**
 * @returns IRectangleProperties
 */
const getRectangleProperties = () => {
    return {
        width: 10,
        height: 10,
        ...baseGraphicsProps
    }
};

/**
 * @returns IRoundedRectangleProperties
 */
const getRoundedRectangleProperties = () => {
    return {
        width: 10,
        height: 10,
        cornerRadius: 2,
        ...baseGraphicsProps
    }
};

/**
 * @returns ICircleProperties
 */
const getCircleProperties = () => {
    return {
        radius: 5,
        ...baseGraphicsProps
    }
}
/**
 * @param {keyof GRAPHICS_TYPES} type
 * @returns IGraphicsPropertiesCombination
 */
export const getGraphicsProperties = (type) => {
    if (type === GRAPHICS_TYPES.RECTANGLE) { return getRectangleProperties(); }
    if (type === GRAPHICS_TYPES.ROUNDED_RECTANGLE) { return getRoundedRectangleProperties(); }
    if (type === GRAPHICS_TYPES.CIRCLE) { return getCircleProperties(); }
    throw new Error("Graphics type is not found: " + type);
}
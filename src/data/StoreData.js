export const ROOT_NODE_ID = 1;

// I haven't decided if the editor will support some extra COMPONENTS like collision  box or mask etc
export const AVAILABLE_COMPONENTS = Object.freeze({
    MASK: "MASK",
    HIT_AREA: "HIT_AREA"
});

export const ENTITY_TYPES = Object.freeze({
    CONTAINER: "CONTAINER",
    SPRITE: "SPRITE",
    GRAPHICS: "GRAPHICS",
    NINE_SLICE_SPRITE: "NINE_SLICE_SPRITE",
    TEXT: "TEXT"


    // ANIMATED_SPRITE: "ANIMATED_SPRITE",
});

export const GRAPHICS_TYPES = Object.freeze({
    RECTANGLE: "RECTANGLE",
    ROUNDED_RECTANGLE: "ROUNDED_RECTANGLE",
    CIRCLE: "CIRCLE"
});

export const FONT_FAMILIES = Object.freeze({
    ARIAL: "Arial",
    ARIAL_BLACK: "Arial Black",
    COMIC_SANS_MS: "Comic Sans MS",
    COURIER_NEW: "Courier New",
    GEORGIA: "Georgia",
    HELVETICA: "Helvetica",
    IMPACT: "Impact",
    TAHOMA: "Tahoma",
    TIMES_NEW_ROMAN: "Times New Roman",
    VERDANA: "Verdana",
});

/**
 * @typedef {{
 *  type: ENTITY_TYPES[keyof ENTITY_TYPES];
 *  components: Array<keyof AVAILABLE_COMPONENTS>
 * }} IEntityData
 */

/**
 * @param {keyof ENTITY_TYPES} type 
 * @param {Array<keyof AVAILABLE_COMPONENTS>} properties
 * 
 * @returns IEntityData 
 */
export const getEntityType = (type, components = []) => {
    return {
        type,
        components
    }
}

/**
 * @typedef {{
 * positionX: number;
 * positionY: number;
 * scaleX: number;
 * scaleY: number;
 * rotation: number;
 * }} IBasePropertyData
 */

/**
 * @returns IBasePropertyData
 */
export const getBaseProperties = () => {
    return {
        positionX: 0,
        positionY: 0,
        scaleX: 1,
        scaleY: 1,
        rotation: 0
    }
};

/**
 * @typedef {{
 * anchorX: number; 
 * anchorY: number;
 * resourceID: number | null;
 * }} ISpriteProperties
 */

/**
 * @returns ISpriteProperties
 */
export const getSpriteProperties = () => {
    return {
        anchorX: 0,
        anchorY: 0,
        resourceID: null
    }
};

// TEXT ================================

/**
 * @typedef {{
 *  anchorX: number;
 *  anchorY: number;
 *  fill:  string;
 *  text: string;
 *  fontFamily: sting;
 *  fontSize: number;
 * }} ITextProperties;
 */

export const getTextProperties = () => {
    return {
        anchorX: 0,
        anchorY: 0,
        text: "No text",
        fill: "#000000",
        fontFamily: FONT_FAMILIES.ARIAL,
        fontSize: 12
    };
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
        width: 100,
        height: 100,
        ...baseGraphicsProps
    }
};

/**
 * @returns IRoundedRectangleProperties
 */
const getRoundedRectangleProperties = () => {
    return {
        width: 100,
        height: 100,
        cornerRadius: 20,
        ...baseGraphicsProps
    }
};

/**
 * @returns ICircleProperties
 */
const getCircleProperties = () => {
    return {
        radius: 50,
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

// 9 SLICE SPRITE ==============================

/**
 * @typedef {{
 * A: number; 
 * B: number; 
 * C: number; 
 * D: number;
 * anchorX: number; 
 * anchorY: number;
 * width: number; 
 * height: number;
 * resourceID: number | null;
 * }} INineSliceSpriteProperties
 */

/**
 * @returns INineSliceSpriteProperties
 */
export const getNineSliceSpriteProperties = () => {
    return {
        A: 5,
        B: 5,
        C: 5,
        D: 5,
        anchorX: 0,
        anchorY: 0,
        width: 50,
        height: 50,
        resourceID: null
    }
}
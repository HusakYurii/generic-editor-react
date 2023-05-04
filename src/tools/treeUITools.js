/**
 * @typedef {{x: number; y: number; width: number; height: number}} Bounds
 */

/**
 * @param {Bounds} bounds 
 * @param {number} x 
 * @param {number} y 
 * @returns {boolean}
 */
export const isInside = (bounds, x, y) => {
    return (
        x > bounds.x &&
        x < bounds.x + bounds.width &&
        y > bounds.y &&
        y < bounds.y + bounds.height
    );
};

export const PositionsInTheBox = Object.freeze({
    TOP: "top",
    CENTER: "center",
    BOTTOM: "bottom",
});

/**
 * @param {DOMRect} bounds 
 * @param {number} x 
 * @param {number} y 
 * @returns {keyof PositionsInTheBox}
 */
export const getPositionInTheBox = (bounds, x, y) => {
    const top = {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height * 0.3,
    };

    const center = {
        x: bounds.x,
        y: bounds.y + bounds.height * 0.3,
        width: bounds.width,
        height: bounds.height * 0.4,
    };

    if (isInside(top, x, y)) return PositionsInTheBox.TOP;
    if (isInside(center, x, y)) return PositionsInTheBox.CENTER;
    else return PositionsInTheBox.BOTTOM;
};

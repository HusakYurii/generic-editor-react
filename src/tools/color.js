/**
 * Converts "0x" color to "#" and visa versa
 * @param {string} color 
 * @returns string
 */
export const convertColorFormat = (color) => {
    if (color.startsWith("0x")) {
        // convert to #00000 format
        return "#" + color.substring(2);
    }
    if (color.startsWith("#")) {
        // convert to 0x00000 format
        return "0x" + color.substring(1);
    }
    return null;
}
export * from "./NumberInput";
export * from "./PointInput";
export * from "./SelectorInput";
export * from "./TextInput";
export * from "./ColorInput";
export * from "./TextureInput";


/**
 * 
 * @param {InputEvent} event 
 * @returns  {[string, number | string]}
 */
export const parseNumberMiddleware = (event) => {
    const key = event.target.getAttribute("data-id");
    const parsedValue = parseFloat(event.target.value);
    const value = !Number.isNaN(parsedValue) ? parsedValue : "";
    return [key, value];
};

/**
 * Prevents negative numbers
 * @param {InputEvent} event 
 */
export const negativeNumbersMiddleware = (event) => {
    const key = event.target.getAttribute("data-id");
    if (parseFloat(event.target.value) < 0) {
        event.target.value = Math.abs(event.target.value)
    };
    return event;
}
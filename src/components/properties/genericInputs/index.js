export * from "./NumberInput";
export * from "./PointInput";
export * from "./SelectorInput";
export * from "./TextInput";
export * from "./ColorInput";

/**
 * Prevents negative numbers
 * @param {InputEvent} event 
 */
export const negativeNumbersMiddleware = (event) => {
    if (parseFloat(event.target.value) < 0) {
        event.target.value = Math.abs(event.target.value)
    };
    return event;
}
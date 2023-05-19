export const DOM_GIZMO_BUTTON_TYPES = {
    MOVE: "MOVE",
    SCALE: "SCALE",
    ROTATE: "ROTATE"
};

export class DOMGizmoButtons {

    /**
     * @param {{move: HTMLInputElement, scale: HTMLInputElement, rotate: HTMLInputElement}} buttons 
     */
    constructor(buttons) {
        this._buttons = buttons;
        this._buttons.move.setAttribute("data-id", DOM_GIZMO_BUTTON_TYPES.MOVE);
        this._buttons.resize.setAttribute("data-id", DOM_GIZMO_BUTTON_TYPES.SCALE);
        this._buttons.rotate.setAttribute("data-id", DOM_GIZMO_BUTTON_TYPES.ROTATE);

        this._onButtonClick = (type) => { }
        this._currentActiveMethod = "";
        this._processClick = this._processClick.bind(this);
    }

    /**
     * @param {(type: DOM_GIZMO_BUTTON_TYPES[keyof DOM_GIZMO_BUTTON_TYPES]) => void} [cb] 
     */
    onButtonClicked(cb) {
        this._onButtonClick = cb ? cb : (type) => { }
    }

    activate() {
        this._buttons.move.addEventListener("click", this._processClick)
        this._buttons.resize.addEventListener("click", this._processClick)
        this._buttons.rotate.addEventListener("click", this._processClick);
    }

    deactivate() {
        this._buttons.move.removeEventListener("click", this._processClick)
        this._buttons.resize.removeEventListener("click", this._processClick)
        this._buttons.rotate.removeEventListener("click", this._processClick)
    }

    /**
     * @param {MouseEvent} event 
     */
    _processClick(event) {
        const dataID = event.target.getAttribute("data-id");

        if (this._currentActiveMethod === dataID) {
            event.target.classList.remove("selected");
            this._currentActiveMethod = "";
            this._onButtonClick("");
            return;
        }

        if (dataID) {
            this._currentActiveMethod = dataID;

            Object.values(this._buttons).forEach(button => button.classList.remove("selected"));
            event.target.classList.add("selected");
            this._onButtonClick(dataID);
        }
    }
}
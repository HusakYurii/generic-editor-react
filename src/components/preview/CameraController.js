
const RIGHT_MOUSE_BUTTON = 2;
const ZOOM_SPEED = 0.02;

const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
};

/**
 * Right mouse click and move will move the camera
 * Wheel scroll will zoom the camera
 * Ctrl + Right mouse click will reset the camera
 * 
 * To remove cursor styles, just remove all those lines
 */
export class CameraController {
    /**
     * @param {HTMLCanvasElement} canvas 
     * @param {PIXI.Ticker} ticker 
     * @param {{ min: number; max: number; }} scale
     * @param {{
     *  setPosition: (point: {x: number; y: number;}) => void;
     *  setScale: (point: {x: number; y: number;}) => void;
     * }} actions
     */
    constructor(canvas, ticker, scale, actions) {

        this._canvas = canvas;
        this._ticker = ticker;
        this._scale = scale;
        this._actions = actions;


        this._needUpdate = false;
        this._isClicked = false;

        this._cameraPosition = { x: 0, y: 0 };
        this._mouseOldPosition = { x: 0, y: 0 };

        this._cameraScale = scale.min;;

        this._onMouseLeave = this._onMouseLeave.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onWheel = this._onWheel.bind(this);

        this._ticker.add(this._update, this);
        this._canvas.addEventListener("mouseleave", this._onMouseLeave);
        this._canvas.addEventListener("mousedown", this._onMouseDown);
        this._canvas.addEventListener("mousemove", this._onMouseMove);
        this._canvas.addEventListener("mouseup", this._onMouseUp);
        this._canvas.addEventListener("wheel", this._onWheel);
    }

    destroy() {
        this._ticker.remove(this._update, this);
        this._canvas.removeEventListener("mouseleave", this._onMouseLeave);
        this._canvas.removeEventListener("mousedown", this._onMouseDown);
        this._canvas.removeEventListener("mousemove", this._onMouseMove);
        this._canvas.removeEventListener("mouseup", this._onMouseUp);
        this._canvas.removeEventListener("wheel", this._onWheel);
    }

    _update() {
        if (!this._needUpdate) {
            return;
        }
        this._needUpdate = false;
        this._actions.setPosition({ ...this._cameraPosition });
        this._actions.setScale({ x: this._cameraScale, y: this._cameraScale });
    }

    _onMouseDown(event) {

        if (event.ctrlKey && event.button === RIGHT_MOUSE_BUTTON) {
            this._resetCamera();
            return;
        }

        if (this._isClicked || event.button !== RIGHT_MOUSE_BUTTON) {
            return;
        }

        this._isClicked = true;
        this._mouseOldPosition = { x: event.x, y: event.y };
        this._canvas.style.cursor = "move";
    }

    _onMouseMove(event) {
        if (!this._isClicked) {
            if (this._canvas.style.cursor.includes("zoom")) {
                this._canvas.style.cursor = "default";
            }
            return;
        }

        if (this._canvas.style.cursor.includes("zoom")) {
            this._canvas.style.cursor = "move";
        }

        const x = this._cameraPosition.x + (event.x - this._mouseOldPosition.x);
        const y = this._cameraPosition.y + (event.y - this._mouseOldPosition.y);

        this._cameraPosition.x = x
        this._cameraPosition.y = y

        this._mouseOldPosition = { x: event.x, y: event.y };
        this._needUpdate = true;
    }

    _onMouseUp(event) {
        if (!this._isClicked) {
            return;
        }

        this._isClicked = false;
        this._canvas.style.cursor = "default";
    }

    _onMouseLeave() {
        this._isClicked = false;
        this._canvas.style.cursor = "default";
    }

    /**
     * 
     * @param {WheelEvent} event 
     */
    _onWheel(event) {
        event.preventDefault();

        const zoomDirection = Math.sign(event.wheelDelta);

        const scl = this._cameraScale + (ZOOM_SPEED * zoomDirection);

        this._cameraScale = clamp(scl, this._scale.min, this._scale.max);

        this._needUpdate = true;
        this._canvas.style.cursor = zoomDirection > 0 ? "zoom-in" : "zoom-out";
    }

    _resetCamera() {
        this._canvas.style.cursor = "default";
        this._cameraPosition = { x: 0, y: 0 };
        this._mouseOldPosition = { x: 0, y: 0 };
        this._cameraScale = this._scale.min;
        this._needUpdate = true;
    }
}

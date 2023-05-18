
import { utils } from "pixi.js";

export class ViewResizeController extends utils.EventEmitter {
    /**
     * 
     * @param {HTMLDivElement} canvasContainer 
     * @param {PIXI.Renderer} renderer 
     * @param {{ width: number;, height: number; }} size the the canvas sizes will never be less then specified
     */
    constructor(canvasContainer, renderer, size) {
        super();

        this.size = { ...size };

        this._renderer = renderer;
        this._canvasContainer = canvasContainer;
        this._designSize = { ...size };

        this._observer = new ResizeObserver(() => this.resize());
    }

    activate() {
        this._observer.observe(this._canvasContainer);
        this.resize();
    }

    deactivate() {
        this._observer.unobserve(this._canvasContainer);
    }

    resize() {
        const newSizes = { width: this._canvasContainer.offsetWidth, height: this._canvasContainer.offsetHeight }
        const { width, height } = this._designSize;

        const containerHeight = newSizes.height;
        const containerWidth = newSizes.width;

        const isPortrait = containerHeight > containerWidth;
        const gameSize = { width: 0, height: 0 };

        if (isPortrait) {
            gameSize.width = width | 0;
            gameSize.height = (height * (containerHeight / containerWidth)) | 0;
        } else {
            gameSize.height = height | 0;
            gameSize.width = (width * (containerWidth / containerHeight)) | 0;
        }

        this._renderer.resize(gameSize.width, gameSize.height);
        this._renderer.view.style.width = `${containerWidth}px`;
        this._renderer.view.style.height = `${containerHeight}px`;

        this.size = gameSize;

        this.emit("update", { ...gameSize });
    }
}

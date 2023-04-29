
export class ResizeController {
    constructor(renderer, { width = 900, height = 900 } = {}) {

        this._renderer = renderer;
        this._designSize = { width, height };

        this.size = { width, height };
    }

    /**
     * @param {{ width: number; height: number;}} newSizes 
     */
    resize(newSizes) {
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
    }
}

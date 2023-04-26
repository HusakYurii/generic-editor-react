import React, { memo, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Application, Graphics, Container } from "pixi.js";

class ResizeController {
    constructor(renderer, container = window, { width = 900, height = 900 } = {}) {

        this._renderer = renderer;
        this._container = container;
        this._designSize = { width, height };

        this.currentSize = { width, height };
        this.resize = this.resize.bind(this);
        this.onResize = (currentSize) => { }

        this._observer = new ResizeObserver(this.resize).observe(this._container)
    }

    destroy() {
        this._observer.unobserve(this._container);
    }

    resize() {
        const { innerWidth, innerHeight, offsetWidth, offsetHeight } = this._container
        const { width, height } = this._designSize;

        const containerHeight = offsetHeight || innerHeight;
        const containerWidth = offsetWidth || innerWidth;

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

        this.currentSize = gameSize;
        this.onResize && this.onResize({ ...gameSize })
    }
}
const createAxis = (container, { width, height }) => {

    const graphics = new Graphics();
    graphics.lineStyle(2, 0x000000);

    // draw the x-axis
    graphics.moveTo(-width / 2, 0);
    graphics.lineTo(width / 2, 0);

    // draw the arrowhead for the positive x-axis direction
    graphics.moveTo(width / 2, 0);
    graphics.lineTo(width / 2 - 10, - 5);
    graphics.moveTo(width / 2, 0);
    graphics.lineTo(width / 2 - 10, 5);

    // draw the y-axis
    graphics.moveTo(0, -height / 2);
    graphics.lineTo(0, height / 2);

    // draw the arrowhead for the positive y-axis direction
    graphics.moveTo(0, height / 2);
    graphics.lineTo(- 5, height / 2 - 10);
    graphics.moveTo(0, height / 2);
    graphics.lineTo(5, height / 2 - 10);

    container.addChild(graphics)
};

const createApp = (canvas, sizes) => {
    return new Application({
        backgroundColor: 0xc2c2c2,
        view: canvas,
        ...sizes
    });
};

/**
 * @typedef {{ 
 * }} PreviewPanelComponentDependencies
 */

/**
 * @param { PreviewPanelComponentDependencies} props 
 */
const PreviewPanelComponent = memo((props) => {

    const canvasRef = useRef(null);



    useEffect(() => {
        const minSize = { width: 900, height: 900 };
        const app = createApp(canvasRef.current, minSize);
        createAxis(app.stage, minSize);

        const resizeController = new ResizeController(app.renderer, canvasRef.current.parentElement, minSize);
        resizeController.onResize = ({ width, height }) => app.stage.position.set(width / 2, height / 2);
        resizeController.resize();

        return () => {
            app.destroy();
            resizeController.destroy();
        }
    }, [])

    return (
        <canvas ref={canvasRef}></canvas>
    );
});

/**
 * @param {import("../../store").IStore} data 
 */
const mapStateToProps = ({ }) => {
    return {};
};


export const PreviewPanel = connect(
    mapStateToProps,
    {
    }
)(PreviewPanelComponent)

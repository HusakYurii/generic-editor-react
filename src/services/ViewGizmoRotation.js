
import { Container, Graphics, Rectangle, mesh, Texture, Circle } from "pixi.js";

const MOVE_DIRECTIONS = {
    X_AXIS: "xAxis",
    Y_AXIS: "yAxis",
    XY_AXIS: "xyAxis",
};

export class ViewGizmoRotation {
    constructor(ticker) {

        this.view = new Container();
        this.view.visible = false;

        this._innerRadius = 80;
        this._outerRadius = 95;

        const arc = new Graphics();
        arc.lineStyle(4, 0x00ff00);
        arc.arc(0, 0, this._innerRadius, 0, Math.PI * 2, false);
        arc.lineStyle(4, 0x0000ff);
        arc.arc(0, 0, this._outerRadius, 0, Math.PI * 2, false);
        arc.beginFill(0xff0000, 1);
        arc.drawCircle(0, 0, 5);
        arc.endFill();

        this.view.addChild(arc);

        this._segmentStartAngle = 0;
        this._fillSegment = new Graphics();
        this.view.addChild(this._fillSegment);

        this._isClicked = false;
        this._oldMousePosition = { x: 0, y: 0 };
        this._deltaAngle = 0;
        this._oldAngle = 0;

        this.view.hitArea = new Circle(0, 0, 100);

        this.view.interactiveChildren = false;
        this.view.on("mousedown", this._onMouseDown, this);
        this.view.on("mousemove", this._onMouseMove, this);
        this.view.on("mouseup", this._onMouseUp, this);
        this.view.on("mouseupoutside", this._onMouseUp, this);

        this._needToUpdate = false;
        this._ticker = ticker;

        this._onMoved = (angle) => { }
    }

    /**
     * 
     * @param {(deltaAngle) => void} [cb] 
     */
    onMoved(cb) {
        this._onMoved = cb ? cb : (angle) => { };
    }

    show() {
        this.view.visible = true;
    }

    hide() {
        this.view.visible = false;
    }

    activate() {
        this.view.interactive = true;
        this._ticker.add(this._update, this);
    }

    deactivate() {
        this._ticker.remove(this._update, this);
        this.view.interactive = false;
    }

    setPosition(point) {
        this.view.x = point.x;
        this.view.y = point.y;
    }

    setRotation(angle) {
        this.view.rotation = angle;
    }

    _onMouseDown(event) {
        if (this._isClicked) {
            return;
        }

        const { x, y } = event.data.getLocalPosition(this.view);

        const hypot = Math.hypot(x, y);

        if (hypot < this._outerRadius && hypot > this._innerRadius) {
            this._isClicked = true;
            this._oldMousePosition = { x, y };
            this._oldAngle = Math.atan2(y, x);
            this._segmentStartAngle = this._oldAngle;
        }
    }

    _onMouseMove({ data }) {
        if (!this._isClicked) {
            return;
        };

        const { x, y } = data.getLocalPosition(this.view);

        const segmentEndAngle = Math.atan2(y, x);

        this._fillSegment.clear()
            .beginFill(0xff0000, 0.5)
            .moveTo(0, 0)
            .arc(0, 0, this._outerRadius, this._segmentStartAngle, segmentEndAngle, false)
            .lineTo(0, 0)
            .endFill();

        this._deltaAngle = segmentEndAngle - this._oldAngle;

        this._oldAngle = segmentEndAngle;
        this._oldMousePosition = { x, y };
        this._needToUpdate = true;
    }

    _onMouseUp(event) {
        if (!this._isClicked) {
            return;
        };

        this._fillSegment.clear();
        this._segmentStartAngle = 0;
        this._oldAngle = 0;
        this._isClicked = false;
    }

    _update() {
        if (!this._needToUpdate) {
            return;
        }

        this._needToUpdate = false;

        this._onMoved(this._deltaAngle);
        this._deltaAngle = 0;
    }

};

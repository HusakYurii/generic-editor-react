import { Container, Graphics, Circle, Rectangle } from "pixi.js";

const MOVE_DIRECTIONS = {
    X_AXIS: "xAxis",
    Y_AXIS: "yAxis",
    XY_AXIS: "xyAxis",
};

export class PositionArrows {
    constructor(ticker) {
        this.view = new Container();

        const size = 180;
        const arrowSize = 30;
        // Y axis
        this._yAxisArrow = new Graphics().lineStyle(5, 0x00ff00)
            .moveTo(0, 0)
            .lineTo(0, -size)
            .moveTo(0, -size)
            .lineTo(-arrowSize / 2, -size + arrowSize)
            .lineTo(0, -size)
            .lineTo(arrowSize / 2, -size + arrowSize)
            .beginFill(0x00ff00)
            .drawPolygon([0, -size, -arrowSize / 2, -size + arrowSize, arrowSize / 2, -size + arrowSize])
            .endFill();

        // X axis
        this._xAxisArrow = new Graphics().lineStyle(5, 0x0000ff)
            .moveTo(0, 0)
            .lineTo(size, 0)
            .moveTo(size, 0)
            .lineTo(size - arrowSize, -arrowSize / 2)
            .lineTo(size, 0)
            .lineTo(size - arrowSize, arrowSize / 2)
            .beginFill(0x0000ff)
            .drawPolygon([size, 0, size - arrowSize, -arrowSize / 2, size - arrowSize, arrowSize / 2])
            .endFill();

        // a circle at the centre
        const circleRadius = 20;
        const segmentColors = [0x00ff00, 0x0000ff, 0x00ff00, 0x0000ff]

        this._center = new Graphics();
        this._center.beginFill(0xffffff);
        this._center.drawCircle(0, 0, circleRadius);

        // Divide the circle into four segments
        const segmentAngle = Math.PI / 2; // angle for each segment (90 degrees)
        for (let i = 0; i < segmentColors.length; i++) {
            this._center.beginFill(segmentColors[i]);
            this._center.moveTo(0, 0);
            this._center.arc(0, 0, circleRadius, i * segmentAngle, (i + 1) * segmentAngle);
            this._center.lineTo(0, 0);
            this._center.endFill();
        }

        this.view.addChild(this._yAxisArrow, this._xAxisArrow, this._center);

        this._axisHitBoxes = {
            [MOVE_DIRECTIONS.X_AXIS]: new Circle(size - arrowSize / 2, 0, arrowSize),
            [MOVE_DIRECTIONS.Y_AXIS]: new Circle(0, -size + arrowSize / 2, arrowSize),
            [MOVE_DIRECTIONS.XY_AXIS]: new Circle(0, 0, 30),
        };

        this._isClicked = false;
        this._targetAxis = "";
        this._oldMousePosition = { x: 0, y: 0 };
        this._offset = { x: 0, y: 0 };

        this.view.interactive = true;
        this.view.interactiveChildren = false;
        this.view.hitArea = new Rectangle(-20, -190, 200, 200);

        this.view.on("mousedown", this._onMouseDown, this);
        this.view.on("mousemove", this._onMouseMove, this);
        this.view.on("mouseup", this._onMouseUp, this);
        this.view.on("mouseupoutside", this._onMouseUp, this);

        this._needToUpdate = false;
        this._ticker = ticker;
        this._ticker.add(this._update, this);

        this._onPositionMove = (dx, dy) => { };
    }

    onPositionMove(cb) {
        this._onPositionMove = cb ? cb : (dx, dy) => { };
    }

    initPositions(point) {
        this.view.x = point.x;
        this.view.y = point.y;
    }

    destroy() {
        this._ticker.remove(this._update, this);

        this.view.interactive = false;
        this.view.off("mousedown", this._onMouseDown, this);
        this.view.off("mousemove", this._onMouseMove, this);
        this.view.off("mouseup", this._onMouseUp, this);

        this.view.destroy();
    }

    _onMouseDown(event) {
        if (this._isClicked) {
            return;
        }

        const { x, y } = event.data.getLocalPosition(this.view);
        const axisName = Object.keys(this._axisHitBoxes).find(key => this._axisHitBoxes[key].contains(x, y))

        if (axisName !== undefined) {
            this._isClicked = true;
            this._targetAxis = axisName;
            this._oldMousePosition = { ...event.data.global };
        }
    }

    _onMouseMove(event) {
        if (!this._isClicked) {
            return;
        };
        const dx = event.data.global.x - this._oldMousePosition.x;
        const dy = event.data.global.y - this._oldMousePosition.y;

        this._oldMousePosition = { ...event.data.global };
        // accumulate the offset, it will be applied in update function
        this._offset.x += (this._targetAxis === MOVE_DIRECTIONS.XY_AXIS || this._targetAxis === MOVE_DIRECTIONS.X_AXIS) ? dx : 0;
        this._offset.y += (this._targetAxis === MOVE_DIRECTIONS.XY_AXIS || this._targetAxis === MOVE_DIRECTIONS.Y_AXIS) ? dy : 0;
        this._needToUpdate = true;
    }

    _onMouseUp(event) {
        if (!this._isClicked) {
            return;
        };

        this._isClicked = false;
    }

    _update() {
        if (!this._needToUpdate) {
            return;
        }

        this._needToUpdate = false;

        // this.view.x += this._offset.x;
        // this.view.y += this._offset.y;

        this._onPositionMove(this._offset.x, this._offset.y);

        this._offset = { x: 0, y: 0 };
    }

};
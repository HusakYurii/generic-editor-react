import { Container, Graphics, Circle, Rectangle } from "pixi.js";

const MOVE_DIRECTIONS = {
    X_AXIS: "xAxis",
    Y_AXIS: "yAxis",
    XY_AXIS: "xyAxis",
};

export class ViewGizmoPositionArrows {
    constructor(ticker) {

        this.view = new Container();
        this.view.visible = false;

        const size = 180;
        const arrowSize = 25;
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

        const segmentColors = [0x00ff00, 0x0000ff, 0x0000ff, 0x00ff00]; // colors for each segment

        // Draw the center rectangle
        this._center = new Graphics();
        this._center.position.set(15, -15)
        // Divide the rectangle into four segments
        const positions = [[-15, -15], [0, -15], [-15, 0], [0, 0]]

        for (let i = 0; i < segmentColors.length; i++) {
            this._center.beginFill(segmentColors[i]);
            this._center.drawRect(positions[i][0], positions[i][1], 15, 15);
        }

        this._center.endFill();

        this.view.addChild(this._yAxisArrow, this._xAxisArrow, this._center);

        this._axisHitBoxes = {
            [MOVE_DIRECTIONS.X_AXIS]: new Circle(size - arrowSize / 2, 0, arrowSize * 1.1),
            [MOVE_DIRECTIONS.Y_AXIS]: new Circle(0, -size + arrowSize / 2, arrowSize * 1.1),
            [MOVE_DIRECTIONS.XY_AXIS]: new Rectangle(0, -30, 30, 30),
        };


        this._isClicked = false;
        this._targetAxis = "";
        this._oldMousePosition = { x: 0, y: 0 };
        this._offset = { x: 0, y: 0 };
        this._elementRotation = 0;

        this.view.on("mousedown", this._onMouseDown, this);
        this.view.on("mousemove", this._onMouseMove, this);
        this.view.on("mouseup", this._onMouseUp, this);
        this.view.on("mouseupoutside", this._onMouseUp, this);

        this._needToUpdate = false;
        this._ticker = ticker;

        this._onMoved = (dx, dy) => { }
    }

    onMoved(cb) {
        this._onMoved = cb ? cb : (dx, dy) => { };
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

    /**
     * To set gizmo position. It will be used for UI
     * @param {{x: number; y: number;}} point 
     */
    setPosition(point) {
        this.view.x = point.x;
        this.view.y = point.y;
    }

    /**
     * To set gizmo rotation. It will be used for UI
     * @param {{x: number; y: number;}} point 
     */
    setRotation(angle) {
        this.view.rotation = angle;
    }

    /**
     * To set selected element rotation. It will be used for actual math. 
     * @param {{x: number; y: number;}} point 
     */
    setElementRotation(angle) {
        this._elementRotation = angle;
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

        const x = event.data.global.x - this._oldMousePosition.x;
        const y = (event.data.global.y - this._oldMousePosition.y);

        let dx = 0;
        let dy = 0;

        if (this._targetAxis === MOVE_DIRECTIONS.X_AXIS) {
            dx = x;
            dy = x * Math.tan(this._elementRotation);
        }
        else if (this._targetAxis === MOVE_DIRECTIONS.Y_AXIS) {
            dx = -y * Math.tan(this._elementRotation);
            dy = y;
        }
        else {
            dx = x;
            dy = y;
        }

        this._oldMousePosition = { ...event.data.global };
        // accumulate the offset, it will be applied in update function
        this._offset.x += dx;
        this._offset.y += dy;
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

        this._onMoved(this._offset.x, this._offset.y);

        this._offset = { x: 0, y: 0 };
    }

};
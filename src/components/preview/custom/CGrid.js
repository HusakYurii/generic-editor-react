
import { CustomPIXIComponent } from "react-pixi-fiber";
import { Container, Graphics } from "pixi.js";
import { toRadians } from "../../../tools/math";

export const behavior = {
    customDisplayObject: ({ cellSize, gridSize, color, lineWidth }) => {
        // cellSize size of each square in the grid
        // gridSize the length of a side of the square

        const gridContainer = new Container();
        gridContainer.name = "CGrid";

        const totalWidth = cellSize * gridSize;
        const totalHeight = cellSize * gridSize;

        gridContainer.position.set(-totalWidth / 2, -totalHeight / 2)

        const graphics = new Graphics();

        // grid
        graphics.lineStyle(lineWidth, color);

        for (let x = 0; x < gridSize; x++) {
            if (x === gridSize / 2) { continue; }
            graphics.moveTo(x * cellSize, 0);
            graphics.lineTo(x * cellSize, totalWidth);
        }

        for (let y = 0; y < gridSize; y++) {
            if (y === gridSize / 2) { continue; }
            graphics.moveTo(0, y * cellSize);
            graphics.lineTo(totalHeight, y * cellSize);
        }

        // y axis
        graphics.lineStyle(lineWidth, 0x00ff00);
        graphics.moveTo(totalWidth / 2, 0);
        graphics.lineTo(totalWidth / 2, totalHeight);

        // x axis
        graphics.moveTo(0, totalHeight / 2);
        graphics.lineTo(totalWidth, totalHeight / 2);

        // rectangle around
        graphics.drawRect(0, 0, totalWidth, totalHeight);
        graphics.endFill();

        gridContainer.addChild(graphics);

        gridContainer.cacheAsBitmap = true;
        return gridContainer;

    },
    customApplyProps: () => { }
};
export const CGrid = CustomPIXIComponent(behavior, "CGrid");
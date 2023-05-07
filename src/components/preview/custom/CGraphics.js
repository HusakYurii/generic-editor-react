
import { CustomPIXIComponent } from "react-pixi-fiber";
import { Graphics } from "pixi.js";
import { toRadians } from "../../../tools/math";
import { GRAPHICS_TYPES } from "../../../data/StoreData";

export const behavior = {
    customDisplayObject: () => new Graphics(),
    customApplyProps: (instance, oldProps, newProps) => {
        const { position, scale, rotation, graphicsData, type } = newProps;

        instance.clear();
        instance.beginFill(graphicsData.color, graphicsData.alpha);

        if (type === GRAPHICS_TYPES.CIRCLE) {
            instance.drawCircle(graphicsData.x, graphicsData.y, graphicsData.radius);
        }
        else if (type === GRAPHICS_TYPES.RECTANGLE) {
            instance.drawRect(graphicsData.x, graphicsData.y, graphicsData.width, graphicsData.height);
        }
        else if (type === GRAPHICS_TYPES.ROUNDED_RECTANGLE) {
            instance.drawRoundedRect(graphicsData.x, graphicsData.y, graphicsData.width, graphicsData.height, graphicsData.cornerRadius);
        }
        else {
            throw new Error("There is no graphics for this type: " + type);
        }
        instance.endFill();

        instance.position.set(position.x, position.y);
        instance.scale.set(scale.x, scale.y);
        instance.rotation = toRadians(rotation);
    }
};
export const CGraphics = CustomPIXIComponent(behavior, "CGraphics");

import { CustomPIXIComponent } from "react-pixi-fiber";
import { Graphics } from "pixi.js";
import { toRadians } from "../../../tools/math";
import { GRAPHICS_TYPES } from "../../../data/StoreData";

export const behavior = {
    customDisplayObject: () => new Graphics(),
    customApplyProps: (instance, oldProps, newProps) => {

        instance.clear();
        instance.beginFill(newProps.color, newProps.alpha);

        if (newProps.type === GRAPHICS_TYPES.CIRCLE) {
            instance.drawCircle(newProps.x, newProps.y, newProps.radius);
        }
        else if (newProps.type === GRAPHICS_TYPES.RECTANGLE) {
            instance.drawRect(newProps.x, newProps.y, newProps.width, newProps.height);
        }
        else if (newProps.type === GRAPHICS_TYPES.ROUNDED_RECTANGLE) {
            instance.drawRoundedRect(newProps.x, newProps.y, newProps.width, newProps.height, newProps.cornerRadius);
        }
        else {
            throw new Error("There is no graphics for this type: " + newProps.type);
        }
        instance.endFill();

        instance.position.set(newProps.positionX, newProps.positionY);
        instance.scale.set(newProps.scaleX, newProps.scaleY);
        instance.rotation = toRadians(newProps.rotation);
        instance.name = String(newProps.id);
    }
};
export const CGraphics = CustomPIXIComponent(behavior, "CGraphics");
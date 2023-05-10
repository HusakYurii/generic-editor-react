
import { CustomPIXIComponent } from "react-pixi-fiber";
import { Sprite } from "pixi.js";
import { toRadians } from "../../../tools/math";

export const behavior = {
    customDisplayObject: () => new Sprite(),
    customApplyProps: (instance, oldProps, newProps) => {

        instance.texture = newProps.texture;

        instance.position.set(newProps.positionX, newProps.positionY);
        instance.scale.set(newProps.scaleX, newProps.scaleY);
        instance.anchor.set(newProps.anchorX, newProps.anchorY);
        instance.rotation = toRadians(newProps.rotation);

    }
};
export const CSprite = CustomPIXIComponent(behavior, "CSprite");
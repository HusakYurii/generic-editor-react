
import { CustomPIXIComponent } from "react-pixi-fiber";
import { Sprite } from "pixi.js";

export const behavior = {
    customDisplayObject: () => new Sprite(),
    customApplyProps: (instance, oldProps, newProps) => {
        const { position, scale, rotation, anchor, texture } = newProps;
        instance.texture = texture;
        instance.position.set(position.x, position.y);
        instance.scale.set(scale.x, scale.y);
        instance.anchor.set(anchor.x, anchor.y);
        instance.rotation = rotation;
    }
};
export const CSprite = CustomPIXIComponent(behavior, "CSprite");
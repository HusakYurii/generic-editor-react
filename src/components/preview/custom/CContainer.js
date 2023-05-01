
import { CustomPIXIComponent } from "react-pixi-fiber";
import { Container } from "pixi.js";
import { toRadians } from "../../../tools/math";

export const behavior = {
    customDisplayObject: () => new Container(),
    customApplyProps: (instance, oldProps, newProps) => {
        const { position, scale, rotation } = newProps;
        instance.position.set(position.x, position.y);
        instance.scale.set(scale.x, scale.y);
        instance.rotation = toRadians(rotation);
    }
};
export const CContainer = CustomPIXIComponent(behavior, "CContainer");
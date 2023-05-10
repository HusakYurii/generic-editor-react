
import { CustomPIXIComponent } from "react-pixi-fiber";
import { mesh } from "pixi.js";
import { toRadians } from "../../../tools/math";

export const behavior = {
    // I set 0.4 because the texture will be EMPTY at the start and it has size of 1x1
    customDisplayObject: (props) => new mesh.NineSlicePlane(props.texture, 0.4, 0.4, 0.4, 0.4),
    customApplyProps: (instance, oldProps, newProps) => {

        instance.texture = newProps.texture;
        instance.width = newProps.width;
        instance.height = newProps.height;

        instance.leftWidth = newProps.A;
        instance.topHeight = newProps.C;
        instance.rightWidth = newProps.B;
        instance.bottomHeight = newProps.D;

        instance.pivot.set(newProps.anchorX * newProps.width, newProps.anchorY * newProps.height);
        instance.position.set(newProps.positionX, newProps.positionY);
        instance.scale.set(newProps.scaleX, newProps.scaleY);
        instance.rotation = toRadians(newProps.rotation);
    }
};
export const CNineSlicePlane = CustomPIXIComponent(behavior, "CNineSlicePlane");

import { CustomPIXIComponent } from "react-pixi-fiber";
import { mesh, Container } from "pixi.js";
import { toRadians } from "../../../tools/math";

export const behavior = {
    // I set 0.4 because the texture will be EMPTY at the start and it has size of 1x1
    customDisplayObject: (props) => {
        const wrapper = new Container();
        // I have to wrap it with a container because when I set the pivot of the NineSlicePlane
        // to mimic anchor value, the origin of it will move as well (((
        // that will cause the Gizmo component to work incorrectly
        wrapper.nineSlicePlane = new mesh.NineSlicePlane(props.texture, 0.4, 0.4, 0.4, 0.4);
        wrapper.addChild(wrapper.nineSlicePlane);

        return wrapper;
    },
    customApplyProps: (instance, oldProps, newProps) => {

        instance.nineSlicePlane.texture = newProps.texture;
        instance.nineSlicePlane.width = newProps.width;
        instance.nineSlicePlane.height = newProps.height;

        instance.nineSlicePlane.leftWidth = newProps.A;
        instance.nineSlicePlane.topHeight = newProps.C;
        instance.nineSlicePlane.rightWidth = newProps.B;
        instance.nineSlicePlane.bottomHeight = newProps.D;

        instance.nineSlicePlane.pivot.set(newProps.anchorX * newProps.width, newProps.anchorY * newProps.height);

        instance.position.set(newProps.positionX, newProps.positionY);
        instance.scale.set(newProps.scaleX, newProps.scaleY);
        instance.rotation = toRadians(newProps.rotation);
        instance.name = String(newProps.id);
    }
};
export const CNineSlicePlane = CustomPIXIComponent(behavior, "CNineSlicePlane");
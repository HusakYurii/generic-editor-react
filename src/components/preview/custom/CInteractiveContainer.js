
import { CustomPIXIComponent } from "react-pixi-fiber";
import { Container, Circle } from "pixi.js";
import { toRadians } from "../../../tools/math";

export const behavior = {
    customDisplayObject: ({ onClick }) => {
        const instance = new Container();
        instance.interactive = true;
        instance.hitArea = new Circle(0, 0, 2000);
        instance.on("click", onClick);
        return instance;
    },
    customApplyProps: (instance, oldProps, newProps) => {
        instance.removeAllListeners();
        instance.on("click", newProps.onClick);
    }
};
export const CInteractiveContainer = CustomPIXIComponent(behavior, "CInteractiveContainer");
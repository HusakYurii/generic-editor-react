import React from "react"
import { cloneNodeDeep } from "../../../data/NodeData";
import "./baseProperties.css";

const TextInput = ({ value, onChange }) => {
    return (
        <>
            <div>
                <input
                    type="text"
                    value={value}
                    onInput={(e) => onChange(e.target.value)}
                ></input>
            </div>
        </>
    );
};

const NumberElement = (props) => {
    const { value, placeholder, onChange, max = 10000, min = -10000, step = 1 } = props;
    return (
        <>
            <div placeholder={placeholder}>
                <input
                    type="number"
                    value={value}
                    max={max}
                    min={min}
                    step={step}
                    onInput={(e) => onChange(e.target.value)}
                ></input>
            </div>
        </>
    );
};

/**
 * @typedef { import("../../../data/NodeData").INodeData } INodeData;
 * @param {{node: INodeData; onDataChange: (nodeId: number, node: INodeData) => void}} props 
 */
export const BaseProperties = ({ node, onDataChange }) => {
    const { name, baseProperties: { position, scale, rotation } } = cloneNodeDeep(node);

    const changeName = (value) => {
        node.name = value;
        onDataChange(node.id, node);
    };

    const changePosition = (name, value) => {
        node.baseProperties.position[name] = Number(value);
        onDataChange(node.id, node);
    }

    const changeScale = (name, value) => {
        node.baseProperties.scale[name] = Number(value);
        onDataChange(node.id, node);
    }

    const changeRotation = (value) => {
        node.baseProperties.rotation = Number(value);
        onDataChange(node.id, node);
    }

    return (
        <div id="base-properties">
            <div id="name-property">
                <div className="property-title"><p>Name</p></div>
                <div className="property-inputs full-with">
                    <TextInput {...{
                        value: name,
                        onChange: (value) => { changeName(value) }
                    }} />
                </div>
            </div>
            <div id="position-property">
                <div className="property-title"><p>Position</p></div>
                <div className="property-inputs">
                    <NumberElement {...{
                        placeholder: "X",
                        value: position.x,
                        onChange: (value) => { changePosition("x", value) }
                    }} />
                    <NumberElement {...{
                        placeholder: "Y",
                        value: position.y,
                        onChange: (value) => { changePosition("y", value) }
                    }} />
                </div>
            </div>

            <div id="scale-property">
                <div className="property-title"><p>Scale</p></div>
                <div className="property-inputs">
                    <NumberElement {...{
                        placeholder: "X",
                        step: 0.1,
                        value: scale.x,
                        onChange: (value) => { changeScale("x", value) }
                    }} />
                    <NumberElement {...{
                        placeholder: "Y",
                        step: 0.1,
                        value: scale.y,
                        onChange: (value) => { changeScale("y", value) }
                    }} />
                </div>
            </div>
            <div id="rotation-property">
                <div className="property-title"><p>Rotation</p></div>
                <div className="property-inputs">
                    <NumberElement {...{
                        placeholder: "DEG",
                        value: rotation,
                        onChange: (value) => { changeRotation(value) }
                    }} />
                </div>
            </div>
        </div>
    );
}
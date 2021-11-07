import React from "react"
import { cloneNodeDeep } from "../../../data/NodeData";
import "./baseProperties.css";


const InputElement = (props) => {
    const { title, type, value, onChange, isExpanded = false, placeholder = "" } = props;
    return (
        <>
            <div className="property-title">
                <p>{title}</p>
            </div>
            <div className={`property-inputs ${isExpanded ? "full-with" : ""}`}>
                <div placeholder={placeholder}>
                    <input
                        type={type}
                        value={value}
                        onInput={(e) => onChange(e.target.value)}
                    ></input>
                </div>
            </div>
        </>
    )
};

const InputGroupElement = (props) => {
    const { title, group } = props;

    return (
        <>
            <div className="property-title">
                <p>{title}</p>
            </div>
            <div className="property-inputs">
                {group.map(({ id, type, value, onChange, placeholder = "" }) => (
                    <div placeholder={placeholder} key={id}>
                        <input
                            type={type}
                            value={value}
                            onInput={(e) => onChange(e.target.value)}
                        ></input>
                    </div>
                ))}
            </div>
        </>
    )
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
                <InputElement {...{
                    title: "Name",
                    type: "text",
                    value: name,
                    isExpanded: true,
                    onChange: (value) => { changeName(value) }
                }} />
            </div>
            <div id="position-property">
                <InputGroupElement {...{
                    title: "Position",
                    group: [
                        { id: 10, type: "number", placeholder: "X", value: position.x, onChange: (value) => { changePosition("x", value) } },
                        { id: 20, type: "number", placeholder: "Y", value: position.y, onChange: (value) => { changePosition("y", value) } }
                    ]
                }} />
            </div>

            <div id="scale-property">
                <InputGroupElement {...{
                    title: "Scale",
                    group: [
                        { id: 30, type: "number", placeholder: "X", value: scale.x, onChange: (value) => { changeScale("x", value) } },
                        { id: 40, type: "number", placeholder: "Y", value: scale.y, onChange: (value) => { changeScale("y", value) } }
                    ]
                }} />
            </div>
            <div id="rotation-property">
                <InputElement {...{
                    title: "Rotation",
                    type: "number",
                    placeholder: "DEG",
                    value: rotation,
                    onChange: (value) => { changeRotation(value) }
                }} />
            </div>
        </div>
    );
}
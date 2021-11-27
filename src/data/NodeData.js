import { clone, cloneDeep } from "lodash";

export const NodeTypes = {
    NineSlicePlane: "NineSlicePlane",
    Container: "Container",
    Sprite: "Sprite",
    Text: "Text",
}

/**
 * @typedef {{
 * id: number;
 * name: string;
 * nodes: INodeData[];
 * type:  "Container" | "Sprite" | "Text" | "NineSlicePlane" | string;
 * baseProperties: {
 *  position: {x: number; y: number},
 *  scale: {x: number; y: number},
 *  rotation: number;
 * }
 * extraProperties: { }
 * }} INodeData
 */

/**
 * 
 * @param {"Container" | "Sprite" | "Text" | "NineSlicePlane" | string} type 
 */
const createExtraProperties = (type = NodeTypes.Container) => {
    switch (type) {
        case NodeTypes.Sprite:
            return {
                texture: "",
                anchor: { x: 0.5, y: 0.5 }
            };
        case NodeTypes.NineSlicePlane:
            return {
                texture: "",
                anchor: { x: 0.5, y: 0.5 },
                leftWidth: 15,
                topHeight: 15,
                rightWidth: 15,
                bottomHeight: 15,
            };
        case NodeTypes.Text:
            return {
                text: "",
                styles: {}
            };
        default:
            return {};
    }
}


const createBaseProperties = () => {
    return {
        position: { x: 0, y: 0 },
        scale: { x: 1, y: 1 },
        rotation: 0
    };
}

/**
 * 
 * @param {number} id 
 * @param {INodeData[]} [nodes = []]
 * @returns {INodeData} 
 */
export const createNode = (id, nodes = []) => {
    return {
        id,
        name: `Node_${id}`,
        nodes: nodes,
        // view related things
        type: NodeTypes.Container,
        baseProperties: createBaseProperties(),
        extraProperties: createExtraProperties()
    }
}

/**
 * 
 * @param {INodeData} node
 * @returns {INodeData} 
 */
export const cloneNodeDeep = ({ id, name, nodes, type, baseProperties, extraProperties }) => {
    return {
        id: id,
        name: name,
        nodes: nodes.map(cloneNodeDeep),
        type: type,
        baseProperties: cloneDeep(baseProperties),
        extraProperties: cloneDeep(extraProperties)
    }
}

/**
 * 
 * @param {INodeData} node
 * @returns {INodeData} 
 */
export const cloneNodeShallow = ({ id, name, nodes, type, baseProperties, extraProperties }) => {
    return {
        id: id,
        name: name,
        nodes: nodes,
        type: type,
        baseProperties: clone(baseProperties),
        extraProperties: clone(extraProperties)
    }
}
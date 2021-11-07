/**
 * @typedef {{
 * id: number;
 * name: string;
 * nodes: INodeData[];
 * type: "Container" | "Sprite" | "Text" | "NineSlicePlane"
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
        type: "Container",
        baseProperties: {
            position: { x: 0, y: 0 },
            scale: { x: 1, y: 1 },
            rotation: 0
        },
        extraProperties: {}
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
        baseProperties: {
            position: { ...baseProperties.position },
            scale: { ...baseProperties.scale },
            rotation: baseProperties.rotation
        },
        extraProperties: {}
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
        baseProperties: baseProperties,
        extraProperties: extraProperties
    }
}
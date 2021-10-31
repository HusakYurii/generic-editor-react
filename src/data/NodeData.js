/**
 * @typedef {{
 * id: number;
 * name: string;
 * nodes: INodeData[];
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
    }
}

/**
 * 
 * @param {INodeData} node
 * @returns {INodeData} 
 */
export const cloneNodeDeep = (node) => {
    return {
        id: node.id,
        name: node.name,
        nodes: node.nodes.map(cloneNodeDeep),
    }
}

/**
 * 
 * @param {INodeData} node
 * @returns {INodeData} 
 */
export const cloneNodeShallow = (node) => {
    return {
        id: node.id,
        name: node.name,
        nodes: node.nodes,
    }
}
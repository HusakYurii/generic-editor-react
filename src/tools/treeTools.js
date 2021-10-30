/**
 * 
 * @param {import("../data/NodeData").INodeData} child 
 * @param {import("../data/NodeData").INodeData} tree
 * @returns {import("../data/NodeData").INodeData | null} 
 */
export const getParent = function (child, tree) {
    // check first if the root element is a parent of a child
    if (isChild(child, tree)) {
        return tree;
    }

    for (let i = 0; i < tree.nodes.length; i++) {
        const node = tree.nodes[i];
        const result = getParent(child, node);
        if (result) {
            return result
        }
    }

    return null
};

/**
 * 
 * @param {import("../data/NodeData").INodeData} child 
 * @param {import("../data/NodeData").INodeData} parent 
 * @returns {boolean} 
 */
export const isChild = function (child, parent) {
    return parent.nodes.some(node => node.id === child.id);
};

/**
 * 
 * @param {number} childId 
 * @param {import("../data/NodeData").INodeData} tree
 * @returns {import("../data/NodeData").INodeData | null} 
 */
export const getParent = function (childId, tree) {
    // check first if the root element is a parent of a child
    if (isParent(childId, tree)) {
        return tree;
    }

    for (let i = 0; i < tree.nodes.length; i++) {
        const result = getParent(childId, tree.nodes[i]);
        if (result) {
            return result
        }
    }

    return null
};

/**
 * This method is traversing through all the children and their children as well
 * 
 * @param {number} childId 
 * @param {import("../data/NodeData").INodeData} parent 
 * @returns {boolean} 
 */
export const isChild = function (childId, parent) {
    if (parent.nodes.some(node => node.id === childId)) {
        return true;
    }
    for (let i = 0; i < parent.nodes.length; i++) {
        if (isChild(childId, parent.nodes[i])) {
            return true;
        }
    }

    return false
};

/**
 * This method is traversing through all the children and their children as well
 * 
 * @param {number} childId 
 * @param {import("../data/NodeData").INodeData} parent 
 * @returns {boolean} 
 */
export const isParent = function (childId, parent) {
    return parent.nodes.some(node => node.id === childId);
}

/**
 * @param {number} nodeId 
 * @param {import("../data/NodeData").INodeData} tree 
 * @returns {import("../data/NodeData").INodeData | null} 
 */
export const getNodeByID = function (nodeId, tree) {
    // check whether the searched node is the root node 
    if (tree.id === nodeId) {
        return tree;
    }
    // check first if the root element has the node we need
    const result = tree.nodes.find(node => node.id === nodeId);
    if (result) {
        return result;
    }

    for (let i = 0; i < tree.nodes.length; i++) {
        const result = getNodeByID(nodeId, tree.nodes[i]);
        if (result) {
            return result
        }
    }

    return null
};

// /**
//  * 
//  * @param {import("../data/NodeData").INodeData} node 
//  * @param {import("../data/NodeData").INodeData} tree 
//  * @returns {import("../data/NodeData").INodeData} 
//  */
// export const replaceNodeData = function (node, tree) {

//     const copyTree = {...tree}

// }
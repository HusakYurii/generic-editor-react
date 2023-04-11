/**
 * 
 * @param {number} childId 
 * @param {import("../data/NodeData").INodeData} tree - can be a node or an entire tree
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
            return result;
        }
    }

    return null;
};

/**
 * This method is traversing through all the children and children of the children as well
 * 
 * @param {number} childId 
 * @param {import("../data/NodeData").INodeData} node
 * @returns {boolean} 
 */
export const isChild = function (childId, node) {
    if (node.nodes.some(node => node.id === childId)) {
        return true;
    }
    for (let i = 0; i < node.nodes.length; i++) {
        if (isChild(childId, node.nodes[i])) {
            return true;
        }
    }

    return false;
};

/**
 * 
 * @param {number} childId 
 * @param {import("../data/NodeData").INodeData} node 
 * @returns {boolean} 
 */
export const isParent = function (childId, node) {
    return node.nodes.some(node => node.id === childId);
}

/**
 * @param {number} nodeId 
 * @param {import("../data/NodeData").INodeData} tree - can be a node or an entire tree
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
            return result;
        }
    }

    return null;
};

/**
 * This function is not pure, its modifies the node data! 
 * @param {number} nodeId 
 * @param {import("../data/NodeData").INodeData} tree - can be a node or an entire tree
 * @returns {boolean} - whether a node has been removed or not
 */
export const removeNode = function (nodeId, tree) {

    if (isParent(nodeId, tree)) {
        tree.nodes = tree.nodes.filter(node => node.id !== nodeId);
        return true;
    }

    for (let i = 0; i < tree.nodes.length; i++) {
        const result = removeNode(nodeId, tree.nodes[i]);
        if (result) {
            return result;
        }
    }

    return false;
}

/**
 * This function is not pure, its modifies the node / tree data! 
 * @param {import("../data/NodeData").INodeData} node - a target node
 * @param {number} referenceID - the parent's node ID we need to append a new node to 
 * @param {import("../data/NodeData").INodeData} tree - can be a node or an entire tree
 * @returns {boolean} - whether a node has been appended or not
 */
export const appendNode = function (node, referenceID, tree) {
    const targetNode = getNodeByID(referenceID, tree);

    if (targetNode) {
        targetNode.nodes = [...targetNode.nodes, node];
        return true;
    }

    return false;
}

/**
 * This function is not pure, its modifies the node / tree data! 
 * @param {import("../data/NodeData").INodeData} node - a target node
 * @param {number} referenceID - the node's ID before which we need to insert a new node
 * @param {import("../data/NodeData").INodeData} tree - can be a node or an entire tree
 * @returns {boolean} - whether a node has been inserted or not
 */
export const insertBefore = function (node, referenceID, tree) {
    const parentNode = getParent(referenceID, tree);

    if (parentNode) {
        for (let i = 0; i < parentNode.nodes.length; i++) {
            if (parentNode.nodes[i].id !== referenceID) {
                continue;
            }
            const copy = [...parentNode.nodes];
            copy.splice(i, 0, node);
            parentNode.nodes = copy;

            return true;
        }
    }

    return false;
}

/**
 *If you are not sure whether a selected node has parents, you should try `changeNodeName` function first
 * 
 * @param {import("../data/NodeData").INodeData} node - root node
 * @param {string} name 
 * @returns {boolean} - whether a node has been updated or not
 */
export const changeRootNodeName = (node, name) => {
    if (!node) {
        return false;
    }
    node.name = name;
    return true;
}

/**
 * Unlike the `changeRootNodeName` this function will try to find a node's parent element.
 * That is needed to process a child node and replace it in the parent's children array;
 * 
 * @param {import("../data/NodeData").INodeData} tree - can be a node or an entire tree 
 * @param {number} referenceID - the ID of the node which will get a new name
 * @param {string} name 
 * @returns {boolean} - whether a node has been updated or not
 */
export const changeNodeName = function (tree, referenceID, name) {

    const parentNode = getParent(referenceID, tree);
    if (!parentNode) {
        return false;
    }

    const childIndex = parentNode.nodes.findIndex((child) => child.id === referenceID);
    const child = { ...parentNode.nodes[childIndex], name };
    parentNode.nodes.splice(childIndex, 1, child);

    return true;
}
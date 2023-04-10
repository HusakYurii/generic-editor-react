import { createNode } from "../data/NodeData";

export const ROOT_NODE_ID = 1;

export const getRoodNodeData = () => {
    const treeRootNode = createNode(ROOT_NODE_ID);
    treeRootNode.name = "RootNode";
    return treeRootNode;
};

export const getRootNodeBaseProperties = () => {
    return {
        [ROOT_NODE_ID]: {
            position: { x: 0, y: 0, },
            scale: { x: 0, y: 0, },
            rotation: 0,
        }
    }
};


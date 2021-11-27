import React from "react"
import { cloneNodeDeep } from "../../data/NodeData";
import { getNodeByID, replaceNode } from "../../tools/treeTools";
import { BaseProperties } from "./properties/base-properties";
import { TypeProperty } from "./properties/type-property";

export const PropertiesPanel = ({ data, hooks }) => {
    const node = getNodeByID(data.nodeId, data.tree);
    const isNodeSelected = data.nodeId !== null && node !== null;

    const handleDataChange = (oldNodeID, newNodeData) => {
        const newTreeData = cloneNodeDeep(data.tree);
        if (replaceNode(oldNodeID, newNodeData, newTreeData)) {
            hooks.setTree(() => newTreeData);
        }
    };

    return (
        <div id="properties-panel">
            {isNodeSelected && <BaseProperties node={node} onDataChange={handleDataChange} />}
            {isNodeSelected && <TypeProperty node={node} />}
        </div>
    );
}
import React, { useState } from "react";
import "./node.css";
/**
 * 
 * @param {{node: import("../../data/NodeData").INodeData}} props 
 */
export const Node = ({ node }) => {
    const [collapsed, setCollapsed] = useState(true);

    const nodesList = <div className="node-nodes">{
        node.nodes.map(node => (
            <Node
                key={node.id}
                node={node}
            />
        ))
    }</div>;

    const toggler = <div className="toggler" onClick={() => setCollapsed(!collapsed)}>{collapsed ? "+" : "-"}</div>;

    return (
        <div className="node">
            {node.nodes.length === 0 ? null : toggler}
            <div className="node-name" draggable="true" data-id={node.id}>
                {node.name}
            </div>
            {collapsed ? null : nodesList}
        </div>
    );
}
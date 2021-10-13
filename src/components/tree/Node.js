import React, { useState } from "react";
import "./node.css";

export const Node = ({ node }) => {
    const [collapsed, setCollapsed] = useState(true);

    const nodesList = <div className="node-nodes">{node.nodes.map(node => <Node key={node.id} node={node} />)}</div>;

    const toggler = <span className="toggler" onClick={() => setCollapsed(!collapsed)}>{collapsed ? "+" : "-"}</span>;

    return (
        <div className="node">
            <div className="node-indicator">
                {node.nodes.length === 0 ? null : toggler}
                <span className="name">{node.name}</span>
            </div>
            {collapsed ? null : nodesList}
        </div>
    );
}
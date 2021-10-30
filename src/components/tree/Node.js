import React, { useState } from "react";
import "./node.css";

export const Node = ({ node, handlers }) => {
    const [collapsed, setCollapsed] = useState(true);

    const nodesList = <div className="node-nodes">{
        node.nodes.map(node => (
            <Node
                key={node.id}
                node={node}
                handlers={handlers}
            />
        ))
    }</div>;

    const toggler = <div className="toggler" onClick={() => setCollapsed(!collapsed)}>{collapsed ? "+" : "-"}</div>;

    return (
        <div className="node">
            <div className="node-indicator" draggable="true">
                {node.nodes.length === 0 ? null : toggler}
                <div className="name"
                    onDragStart={handlers.handleDragStart.bind(null, node)}
                    onDragOver={handlers.handleDragOver.bind(null, node)}
                >{node.name}</div>
            </div>
            {collapsed ? null : nodesList}
        </div>
    );
}
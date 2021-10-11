import React from "react";
import "./node.css";

export const Node = ({ node }) => {
    const nodes = node.nodes.map(node => <Node key={node.id} node={node} />);
    const toggler = node.nodes.length > 0 ? <span className="toggler">x</span> : null;

    return (
        <div className="node">
            <div className="node-indicator">
                {toggler}
                <span className="name">{node.name}</span>
            </div>
            <div className="node-nodes">{nodes}</div>
        </div>
    );
}
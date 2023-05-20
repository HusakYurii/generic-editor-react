import React, { useState } from "react";
import "./node.css";
import store from "../../store";
import { ENTITY_TYPES } from "../../data/StoreData";

import containerIcon from "../../assets/icons/container.png";
import spriteIcon from "../../assets/icons/sprite.png";
import textIcon from "../../assets/icons/text.png";
import nineSliceSpriteIcon from "../../assets/icons/nine-slice-sprite.png";
import animatedSpriteIcon from "../../assets/icons/animated-sprite.png";
import graphicsIcon from "../../assets/icons/graphics.png";
import { isChild } from "../../tools/treeTools";

export const NODE_DATA_TYPE_ATTRIBUTE = "node-element";

const ICONS_TO_ENTITIES_MAP = {
    [ENTITY_TYPES.CONTAINER]: containerIcon,
    [ENTITY_TYPES.SPRITE]: spriteIcon,
    [ENTITY_TYPES.GRAPHICS]: graphicsIcon,
    [ENTITY_TYPES.NINE_SLICE_SPRITE]: nineSliceSpriteIcon,
    [ENTITY_TYPES.TEXT]: textIcon,
};

/**
 * 
 * @param {{node: import("../../data/NodeData").INodeData}} props 
 */
export const Node = ({ node, selectedNodeID }) => {
    const [collapsed, setCollapsed] = useState(true);

    if (isChild(selectedNodeID, node)) {
        collapsed && setCollapsed(() => false)
    }

    const nodesList = <div className="node-nodes">
        {node.nodes.map(node => <Node key={node.id} selectedNodeID={selectedNodeID} node={node} />)}
    </div>;

    const toggler = <div className="toggler" onClick={() => setCollapsed(!collapsed)}>{collapsed ? <>&#43;</> : <>&#x2212;</>}</div>;

    const entityType = store.getState().entityTypesList[node.id].type;
    const iconStyle = { backgroundImage: `url(${ICONS_TO_ENTITIES_MAP[entityType]})` };

    return (
        <div className="node">
            {node.nodes.length === 0 ? null : toggler}
            <div className="node-icon" style={iconStyle}></div>
            <div draggable="true" className={`node-name ${selectedNodeID === node.id ? "selected" : ""}`} data-id={node.id} data-type={NODE_DATA_TYPE_ATTRIBUTE}>
                {node.name ? node.name : "---"}
            </div>
            {collapsed ? null : nodesList}
        </div>
    );
}
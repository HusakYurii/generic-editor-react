import React from "react"
import { Tree } from "./tree"

export const HierarchyPanel = (props) => {
    return (
        <div id="hierarchy-panel">
            <div id="tree-container"><Tree {...props} /></div>
        </div>
    );
}
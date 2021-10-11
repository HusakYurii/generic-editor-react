import React from "react";
import { Node } from "./Node";

import "./tree.css";

export const Tree = ({ tree }) => {
    return (
        <div id="tree">
            <Node key={tree.id} node={tree} />
        </div>
    );
}
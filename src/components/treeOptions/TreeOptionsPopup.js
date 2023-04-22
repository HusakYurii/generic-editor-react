import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import "./treeOptionsPopup.css";

import { NODE_DATA_TYPE_ATTRIBUTE } from "../tree";

import { createNodeAction, deleteNodeAction } from "../../store/tree";
import { initContainerEntityAction, initSpriteEntityAction, removeEntityAction } from "../../store/entityTypes";
import { initBasePropertiesAction, removeBasePropertiesAction } from "../../store/properties/base";
import { initSpritePropertiesAction, removeSpritePropertiesAction } from "../../store/properties/sprite";
import { ENTITY_TYPES, ROOT_NODE_ID } from "../../data/StoreData";
import { getUID } from "../../tools/uidGenerator";

const REMOVE_OPTION = "REMOVE";

/**
 * @typedef {{
 * createNodeAction: typeof createNodeAction;
 * deleteNodeAction: typeof deleteNodeAction;
 * initContainerEntityAction: typeof initContainerEntityAction;
 * initSpriteEntityAction: typeof  initSpriteEntityAction;
 * removeEntityAction: typeof  removeEntityAction;
 * initBasePropertiesAction: typeof  initBasePropertiesAction;
 * removeBasePropertiesAction: typeof  removeBasePropertiesAction;
 * initSpritePropertiesAction: typeof  initSpritePropertiesAction;
 * removeSpritePropertiesAction: typeof  removeSpritePropertiesAction; 
 * }} TreeOptionsPopupComponentDependencies
 */

/**
 * Each node must have base properties
 * @param { TreeOptionsPopupComponentDependencies} props 
 */
const TreeOptionsPopupComponent = (props) => {

    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [isVisible, setVisibility] = useState(false);
    const [hoveredNodeID, setHoveredNodeID] = useState(null);
    const popupRef = useRef(null);

    const onContextmenu = ({ target, clientX, clientY }) => {
        const type = target.getAttribute("data-type");
        const id = target.getAttribute("data-id");
        if (id && type && type === NODE_DATA_TYPE_ATTRIBUTE) {
            setVisibility(true);
            setPosition({ top: clientY - 5, left: clientX - 5 });
            setHoveredNodeID(Number(id));
        }
    };

    useEffect(() => {
        window.addEventListener("contextmenu", onContextmenu);
        return () => window.removeEventListener("contextmenu", onContextmenu);
    }, []);

    const onMouseleave = () => {
        setVisibility(false);
        setPosition({ top: 0, left: 0 });
        setHoveredNodeID(null);
    };

    useEffect(() => {
        // we know that when the useEffect fires the ref element will be there
        popupRef.current.addEventListener("mouseleave", onMouseleave);
        return () => popupRef.current.removeEventListener("mouseleave", onMouseleave);
    }, []);

    const onClick = (event) => {
        const option = event.target.getAttribute("data-option");
        if (!option) {
            return;
        }

        if (option === REMOVE_OPTION) {
            props.deleteNodeAction(hoveredNodeID);
            props.removeEntityAction(hoveredNodeID);
            props.removeBasePropertiesAction(hoveredNodeID);
            props.removeSpritePropertiesAction(hoveredNodeID);
        }
        else {
            const id = getUID();
            props.createNodeAction(hoveredNodeID, id);
            props.initBasePropertiesAction(id);

            if (option === ENTITY_TYPES.SPRITE) {
                props.initSpriteEntityAction(id);
                props.initSpritePropertiesAction(id);
            }
            else if (option === ENTITY_TYPES.CONTAINER) {
                props.initContainerEntityAction(id);
            }
        }

        onMouseleave();
    }

    return (
        <div
            id="tree-options-popup"
            ref={popupRef}
            style={{ ...position, display: isVisible ? "block" : "none" }}
            onClick={onClick}
        >
            <div data-option={ENTITY_TYPES.CONTAINER}>Add Container</div>
            <div data-option={ENTITY_TYPES.SPRITE}>Add Sprite</div>

            {/* ROOT_NODE_ID can't be deleted so the option will become disabled */}
            <div data-option={REMOVE_OPTION}
                className="remove-option"
                style={{ display: hoveredNodeID !== ROOT_NODE_ID ? "block" : "none" }}
            >Remove</div>
        </div>
    );
};

/**
 * @param {import("../../store").IStore} data 
 */
const mapStateToProps = ({ tree }) => {
    return {};
};


export const TreeOptionsPopup = connect(
    mapStateToProps,
    {
        createNodeAction,
        deleteNodeAction,
        initContainerEntityAction,
        initSpriteEntityAction,
        removeEntityAction,
        initBasePropertiesAction,
        removeBasePropertiesAction,
        initSpritePropertiesAction,
        removeSpritePropertiesAction,
    }
)(TreeOptionsPopupComponent)

import React from "react";
import { connect } from "react-redux";

import { NODE_DATA_TYPE_ATTRIBUTE } from ".";

import { createNodeAction, deleteNodeAction } from "../../store/tree";
import { initContainerEntityAction, initSpriteEntityAction, removeEntityAction } from "../../store/entityTypes";
import { initBasePropertiesAction, removeBasePropertiesAction } from "../../store/properties/base";
import { initSpritePropertiesAction, removeSpritePropertiesAction } from "../../store/properties/sprite";
import { ENTITY_TYPES, ROOT_NODE_ID } from "../../data/StoreData";
import { getUID } from "../../tools/uidGenerator";
import { PopupWithOptions, REMOVE_OPTION } from "../optionsPopup";

const OPTIONS_MAP = [
    { id: ENTITY_TYPES.CONTAINER, option: "Add Container" },
    { id: ENTITY_TYPES.SPRITE, option: "Add Sprite" },
]

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
    const optionsMap = [...OPTIONS_MAP];

    const canShowRemoveOption = (hoveredElement) => {
        /* ROOT_NODE_ID can't be deleted so the option will become disabled */
        const id = hoveredElement ? hoveredElement.getAttribute("data-id") : undefined;
        return id && Number(id) !== ROOT_NODE_ID;
    };

    const canProcessContextMenu = (event) => {
        const type = event.target.getAttribute("data-type");
        const id = event.target.getAttribute("data-id");
        return (id && type && type === NODE_DATA_TYPE_ATTRIBUTE)
    };

    const canProcessClick = (event) => {
        return Boolean(event.target.getAttribute("data-option"));
    };

    const processClick = (event, hoveredElement) => {
        const option = event.target.getAttribute("data-option");
        const id = Number(hoveredElement.getAttribute("data-id"));

        if (option === REMOVE_OPTION) {
            props.deleteNodeAction(id);
            props.removeEntityAction(id);
            props.removeBasePropertiesAction(id);
            props.removeSpritePropertiesAction(id);
        }
        else {
            const newID = getUID();
            props.createNodeAction(id, newID);
            props.initBasePropertiesAction(newID);

            if (option === ENTITY_TYPES.SPRITE) {
                props.initSpriteEntityAction(newID);
                props.initSpritePropertiesAction(newID);
            }
            else if (option === ENTITY_TYPES.CONTAINER) {
                props.initContainerEntityAction(newID);
            }
        }
    };

    return (
        <PopupWithOptions {
            ...{ canShowRemoveOption, canProcessContextMenu, canProcessClick, processClick, optionsMap }
        } />
    );
};

/**
 * @param {import("../../store").IStore} data 
 */
const mapStateToProps = ({ }) => {
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

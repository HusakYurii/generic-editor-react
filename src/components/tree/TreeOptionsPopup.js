import React from "react";
import { connect } from "react-redux";

import { NODE_DATA_TYPE_ATTRIBUTE } from ".";

import { createNodeAction, deleteNodeAction } from "../../store/tree";
import { initContainerEntityAction, initSpriteEntityAction, initGraphicsEntityAction, removeEntityAction } from "../../store/entityTypes";
import { initBasePropertiesAction, removeBasePropertiesAction } from "../../store/properties/base";
import { initSpritePropertiesAction, removeSpritePropertiesAction } from "../../store/properties/sprite";
import { initGraphicsPropertiesAction, removeGraphicsPropertiesAction } from "../../store/properties/graphics";
import { ENTITY_TYPES, GRAPHICS_TYPES, ROOT_NODE_ID } from "../../data/StoreData";
import { getUID } from "../../tools/uidGenerator";
import { PopupWithOptions } from "../optionsPopup";
import store from "../../store";

const OPTIONS_MAP = {
    ...ENTITY_TYPES,
    REMOVE_OPTION: "REMOVE_OPTION"
}

/**
 * @typedef {{
 * createNodeAction: typeof createNodeAction;
 * deleteNodeAction: typeof deleteNodeAction;
 * initContainerEntityAction: typeof initContainerEntityAction;
 * initSpriteEntityAction: typeof  initSpriteEntityAction;
 * initGraphicsEntityAction: typeof initGraphicsEntityAction;
 * removeEntityAction: typeof  removeEntityAction;
 * initBasePropertiesAction: typeof  initBasePropertiesAction;
 * removeBasePropertiesAction: typeof  removeBasePropertiesAction;
 * initSpritePropertiesAction: typeof  initSpritePropertiesAction;
 * removeSpritePropertiesAction: typeof  removeSpritePropertiesAction;
 * initGraphicsPropertiesAction: typeof initGraphicsPropertiesAction; 
 * removeGraphicsPropertiesAction: typeof removeGraphicsPropertiesAction; 
 * }} TreeOptionsPopupComponentDependencies
 */

/**
 * Each node must have base properties
 * @param { TreeOptionsPopupComponentDependencies} props 
 */
const TreeOptionsPopupComponent = (props) => {

    const canShowRemoveOption = (hoveredElement) => {
        /* ROOT_NODE_ID can't be deleted so the option will become disabled */
        const id = hoveredElement ? hoveredElement.getAttribute("data-id") : undefined;
        return id && Number(id) !== ROOT_NODE_ID;
    };

    const optionsMap = [
        { option: OPTIONS_MAP.CONTAINER, label: "Add Container", canShow: () => true },
        { option: OPTIONS_MAP.SPRITE, label: "Add Sprite", canShow: () => true },
        { option: OPTIONS_MAP.GRAPHICS, label: "Add Graphics", canShow: () => true },
        { option: OPTIONS_MAP.REMOVE_OPTION, label: "Remove", className: "remove-option", canShow: canShowRemoveOption },
    ];

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

        if (option === OPTIONS_MAP.REMOVE_OPTION) {
            const entity = store.getState().entityTypesList[id];
            // these 3 are for any type of entity, so we will remove them at once
            props.deleteNodeAction(id);
            props.removeEntityAction(id);
            props.removeBasePropertiesAction(id);

            if (entity.type === ENTITY_TYPES.SPRITE) { props.removeSpritePropertiesAction(id); }
            else if (entity.type === ENTITY_TYPES.GRAPHICS) { props.removeGraphicsPropertiesAction(id); }
            else { throw new Error("You forgot to add a handler for REMOVE option"); }
            return;
        }

        const newID = getUID();
        props.createNodeAction(id, newID);
        props.initBasePropertiesAction(newID);

        if (option === OPTIONS_MAP.SPRITE) {
            props.initSpriteEntityAction(newID);
            props.initSpritePropertiesAction(newID);
        }
        else if (option === OPTIONS_MAP.CONTAINER) {
            props.initContainerEntityAction(newID);
        }
        else if (option === OPTIONS_MAP.GRAPHICS) {
            props.initGraphicsEntityAction(newID);
            props.initGraphicsPropertiesAction(newID, GRAPHICS_TYPES.RECTANGLE);
        }
        else {
            throw new Error("You forgot to add a handler for ADD option")
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
        initGraphicsEntityAction,
        removeEntityAction,
        initBasePropertiesAction,
        removeBasePropertiesAction,
        initSpritePropertiesAction,
        removeSpritePropertiesAction,
        initGraphicsPropertiesAction,
        removeGraphicsPropertiesAction
    }
)(TreeOptionsPopupComponent)

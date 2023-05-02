import React from "react";
import { connect } from "react-redux";

import { addResourceAction, removeResourceAction } from "../../store/resources";
import { getUID } from "../../tools/uidGenerator";
import { createImagesLoader } from "../../tools/resourcesTools";
import { REMOVE_OPTION, PopupWithOptions } from "../optionsPopup";
import { pixiLoader } from "../../middlewares/pixiLoaderMiddleware";
import store from "../../store";

const OPTIONS = {
    ADD_IMAGE: "ADD_IMAGE"
};

const OPTIONS_MAP = [
    { id: OPTIONS.ADD_IMAGE, option: "Add Image" }
];


/**
 * @typedef {{
 * addResourceAction: typeof addResourceAction;
 * removeResourceAction: typeof removeResourceAction;
 * }} ResourcesOptionsPopupComponentDependencies
 */

/**
 * Each node must have base properties
 * @param { ResourcesOptionsPopupComponentDependencies} props 
 */
const ResourcesOptionsPopupComponent = (props) => {

    const optionsMap = [...OPTIONS_MAP];

    const canShowRemoveOption = (hoveredElement) => {
        /* resources-panel can't have remove option when showing the popup */
        const dataType = hoveredElement ? hoveredElement.getAttribute("data-type") : undefined;
        return dataType !== "resources-panel";
    };

    const canProcessContextMenu = (event) => {
        const dataType = event.target.getAttribute("data-type");
        return (dataType === "resources-panel" || dataType == "image-preview");
    };

    const canProcessClick = (event) => {
        return Boolean(event.target.getAttribute("data-option"));
    };

    const processClick = (event, hoveredElement) => {
        const option = event.target.getAttribute("data-option");
        const id = Number(hoveredElement.getAttribute("id"));

        if (option === REMOVE_OPTION) {
            pixiLoader.removeAssets(store.getState().resourcesList[id])
            props.removeResourceAction(id);
        }
        else {
            const onImagesLoaded = (files) => {
                pixiLoader.loadAssets(files, () => {
                    const data = files.map((file) => ({ id: getUID(), file }));
                    props.addResourceAction(data);
                });
            };

            const imageLoaderElement = createImagesLoader(onImagesLoaded);
            imageLoaderElement.click();
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
const mapStateToProps = (data) => {
    return {};
};


export const ResourcesOptionsPopup = connect(
    mapStateToProps,
    {
        addResourceAction,
        removeResourceAction
    }
)(ResourcesOptionsPopupComponent)

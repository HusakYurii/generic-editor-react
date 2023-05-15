import React from "react";
import { connect } from "react-redux";

import { addResourceAction, removeResourceAction } from "../../store/resources";
import { getUID } from "../../tools/uidGenerator";
import { createImagesLoader, exportImageFile } from "../../tools/resourcesTools";
import { PopupWithOptions } from "../optionsPopup";
import { pixiLoader } from "../../middlewares/pixiLoaderMiddleware";
import store from "../../store";

const OPTIONS_MAP = {
    ADD_IMAGE: "ADD_IMAGE",
    DOWNLOAD_IMAGE: "DOWNLOAD_IMAGE",
    REMOVE_IMAGE: "REMOVE_IMAGE",
};

/**
 * @typedef {{
 * addResourceAction: typeof addResourceAction;
 * removeResourceAction: typeof removeResourceAction;
 * }} ResourcesOptionsPopupComponentDependencies
 */

/**
 * @param { ResourcesOptionsPopupComponentDependencies} props 
 */
const ResourcesOptionsPopupComponent = (props) => {

    const canShowRemoveOption = (hoveredElement) => {
        /* resources-panel can't have remove option when showing the popup */
        const dataType = hoveredElement ? hoveredElement.getAttribute("data-type") : undefined;
        return dataType !== "resources-panel";
    };

    const canShowDownloadOption = (hoveredElement) => {
        /* If there is no images, we don't show the option */
        const id = hoveredElement ? parseInt(hoveredElement.getAttribute("data-image-id")) : NaN;
        return !Number.isNaN(id);
    };

    const optionsMap = [
        { option: OPTIONS_MAP.ADD_IMAGE, label: "Add Image", isAvailable: () => true },
        { option: OPTIONS_MAP.DOWNLOAD_IMAGE, label: "Download Image", isAvailable: canShowDownloadOption },
        { option: OPTIONS_MAP.REMOVE_IMAGE, label: "Remove Image", className: "remove-option", isAvailable: canShowRemoveOption },
    ];

    const canProcessContextMenu = (event) => {
        const dataType = event.target.getAttribute("data-type");
        return (dataType === "resources-panel" || dataType == "image-preview");
    };

    const canProcessClick = (event) => {
        return Boolean(event.target.getAttribute("data-option"));
    };

    const processClick = (event, hoveredElement) => {
        const option = event.target.getAttribute("data-option");
        if (option && option === OPTIONS_MAP.ADD_IMAGE) {
            const onImagesLoaded = (files) => {
                pixiLoader.loadAssets(files, () => {
                    const data = files.map((file) => ({ id: getUID(), file }));
                    props.addResourceAction(data);
                });
            };

            const imageLoaderElement = createImagesLoader(onImagesLoaded);
            imageLoaderElement.click();
            return;
        }

        const id = parseInt(hoveredElement.getAttribute("data-image-id"));

        if (!id) {
            return;
        }

        if (option === OPTIONS_MAP.REMOVE_IMAGE) {
            pixiLoader.removeAssets(store.getState().resourcesList[id])
            props.removeResourceAction(id);
        }
        else if (option === OPTIONS_MAP.DOWNLOAD_IMAGE) {
            const file = store.getState().resourcesList[id];
            exportImageFile(file, file.name);
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

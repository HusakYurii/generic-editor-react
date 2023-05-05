import { VERSION } from "../../../VERSION";
import { convertImageFileToBase64, exportJSONFile } from "../../../tools/resourcesTools";
import { convertResourcesRecursively } from "./common";

export const FILE_TYPES = {
    MAIN: "data-main",
    RESOURCES: "data-resources-base64"
};

const FILE_DESCRIPTION = {
    MAIN: "This file is a bundle and contains the tree hierarchy, entity types each node represents, base and sprite properties",
    RESOURCES: "This file contains the resources. The resources are in base64 format",
};

const FILE_NAMES = {
    MAIN: "mainData.json",
    RESOURCES: "assesMapAsBase64.json"
};


/**
 * To save resources which are used and export them in the map in base 64 format
 * @param {import("../../store").IStore} store 
 */
const exportResourcesAsBase64 = (store) => {
    const { resourcesList, spritePropertiesList } = store.getState();

    const resourcesToExport = Object.values(spritePropertiesList)
        .reduce((acc, { resourceID }) => {
            if (resourceID) { acc.push([resourceID, resourcesList[resourceID]]) }
            return acc;
        }, []);

    const onResourcesConverted = (resources) => {
        exportJSONFile(
            JSON.stringify({
                meta: {
                    version: VERSION,
                    type: FILE_TYPES.RESOURCES,
                    description: FILE_DESCRIPTION.RESOURCES
                },
                resources
            }, null, 2),
            FILE_NAMES.RESOURCES
        );
    };

    convertResourcesRecursively(resourcesToExport, {}, convertImageFileToBase64, onResourcesConverted);
};

/**
 * To make a bundle with all the data and save it as json file
 * @param {import("../../../store").IStore} store 
 */
const exportMainData = (store) => {
    const { tree, entityTypesList, basePropertiesList, spritePropertiesList } = store.getState();

    exportJSONFile(
        JSON.stringify({
            meta: {
                version: VERSION,
                type: FILE_TYPES.MAIN,
                description: FILE_DESCRIPTION.MAIN
            },
            treeData: tree.treeData,
            entityTypesList,
            basePropertiesList,
            spritePropertiesList
        }, null, 2),
        FILE_NAMES.MAIN
    );
};

/**
 * @param {import("../../../store").IStore} store 
 */
export const exportData = (store) => {
    exportMainData(store);
    exportResourcesAsBase64(store);
}
import { VERSION } from "../../../VERSION";
import { convertImageFileToBase64, exportJSONFile } from "../../../tools/resourcesTools";
import { convertResourcesRecursively } from "./common";
import { after } from "lodash"

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
 * @param {import("../../../store/properties/sprite").ISpritePropertiesListState & import("../../../store/properties/nineSliceSprite").INineSliceSpritePropertiesListState} data 
 * @param {import("../../../store/resources").IResourcesListState} resourcesList 
 */
const collectUsedResources = (data, resourcesList) => {
    return Object.values(data)
        .reduce((acc, { resourceID }) => {
            if (resourceID) { acc.push([resourceID, resourcesList[resourceID]]) }
            return acc;
        }, []);
}
/**
 * To save resources which are used and export them in the map in base 64 format
 * @param {import("../../../store").Store} store 
 * @param {() => void} onFinish 
 */
const exportResourcesAsBase64 = (store, onFinish) => {
    const { resourcesList, spritePropertiesList, nineSliceSpritePropertiesList } = store.getState();

    const resourcesToExport = collectUsedResources({ ...spritePropertiesList, ...nineSliceSpritePropertiesList }, resourcesList);

    /**
     * @param {{[id: string]: { name: string; url: string;}}} resources 
     */
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
        onFinish();
    };

    convertResourcesRecursively(resourcesToExport, {}, convertImageFileToBase64, onResourcesConverted);
};

/**
 * To make a bundle with all the data and save it as json file
 * @param {import("../../../store").Store } store 
 * @param {() => void} onFinish
 */
const exportMainData = (store, onFinish) => {
    const {
        tree,
        entityTypesList,
        basePropertiesList,
        spritePropertiesList,
        nineSliceSpritePropertiesList,
        graphicsList,
        textPropertiesList
    } = store.getState();

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
            spritePropertiesList,
            nineSliceSpritePropertiesList,
            graphicsList,
            textPropertiesList
        }, null, 2),
        FILE_NAMES.MAIN
    );

    onFinish();
};

/**
 * @param {import("../../../store").Store} store 
 * @param {() => void} [onFinish]
 */
export const exportData = (store, onFinish = () => { }) => {

    const callback = after(2, onFinish)

    exportMainData(store, callback);
    exportResourcesAsBase64(store, callback);
}
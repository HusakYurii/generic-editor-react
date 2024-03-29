import { pixiLoader } from "../../../middlewares/pixiLoaderMiddleware";
import { base64ImageToFile, convertJSONFilesToText, createJSONLoader } from "../../../tools/resourcesTools";
import { collectAllIds } from "../../../tools/treeTools";
import { recordUsedUIDs } from "../../../tools/uidGenerator";
import { convertResourcesRecursively } from "./common";
import { FILE_TYPES } from "./exportLogic";

export const importMainDataInStrictOrder = (data, actions) => {
    // @TODO fix the data structure to avoid issues like one described below
    // I have to set the tree data to null first so the other components like PreviewPanel doesn't trow errors
    // when creating the UI. It does it because it depends of the tree to recursively build the UI
    // At the end I set the tree data

    actions.importTreeDataAction(null);
    actions.importEntityDataAction(data.entityTypesList);
    actions.importBasePropertiesAction(data.basePropertiesList);
    actions.importSpritePropertiesAction(data.spritePropertiesList);
    actions.importNineSliceSpritePropertiesAction(data.nineSliceSpritePropertiesList);
    actions.importGraphicsPropertiesAction(data.graphicsList);
    actions.importTextPropertiesAction(data.textPropertiesList);
    actions.importTreeDataAction(data.treeData);
};

/**
 * 
 * @param {*} dataFiles 
 * @param {import("../Header").HeaderComponentDependencies} actions 
 */
const importMainFile = (convertedFiles, actions) => {
    const mainDataFile = convertedFiles.find(({ meta }) => meta.type === FILE_TYPES.MAIN);

    if (mainDataFile) {
        recordUsedUIDs(collectAllIds(mainDataFile.treeData, []));
        importMainDataInStrictOrder(mainDataFile, actions);
    }
};

/**
 * 
 * @param {*} dataFiles 
 * @param {import("../Header").HeaderComponentDependencies} actions
 * @param {()=> void} onFinish
 */
const importResources = (convertedFiles, actions, onFinish) => {
    const resourcesDataFile = convertedFiles.find(({ meta }) => meta.type === FILE_TYPES.RESOURCES);

    if (resourcesDataFile) {
        /**
         * 
         * @param {{[id: string]: { name: string; url: string;}}} convertedResources 
         */
        const onResourcesConverted = (convertedResources) => {

            recordUsedUIDs(Object.keys(convertedResources));

            pixiLoader.loadAssets(Object.values(convertedResources), () => {
                actions.importResourcesAction(convertedResources);
                onFinish();
            })
        };

        convertResourcesRecursively(Object.entries(resourcesDataFile.resources), {}, base64ImageToFile, onResourcesConverted);
    }
    else {
        onFinish();
    }
};

/**
 * 
 * @param {File[]} files 
 * @param {import("../Header").HeaderComponentDependencies} actions 
 */
const parseAndImportFiles = (files, actions) => {

    /** */
    const onFilesConverted = (convertedFiles) => {
        convertedFiles = convertedFiles.map((file) => JSON.parse(file.url));
        // first we must import all the resources and then data
        importResources(convertedFiles, actions, () => importMainFile(convertedFiles, actions));
    };

    convertJSONFilesToText(files, onFilesConverted);
};

/**
 * @param {import("../Header").HeaderComponentDependencies} actions 
 */
export const importData = (actions) => {
    const jsonLoader = createJSONLoader((files) => {
        parseAndImportFiles(files, actions);
    });
    jsonLoader.click();
};
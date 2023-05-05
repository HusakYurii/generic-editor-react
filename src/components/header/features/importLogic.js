import { pixiLoader } from "../../../middlewares/pixiLoaderMiddleware";
import { base64ImageToFile, convertJSONFilesToText, createJSONLoader } from "../../../tools/resourcesTools";
import { convertResourcesRecursively } from "./common";
import { FILE_TYPES } from "./exportLogic";

/**
 * 
 * @param {*} dataFiles 
 * @param {import("../Header").HeaderComponentDependencies} actions 
 */
const importMainFile = (convertedFiles, actions) => {
    const mainDataFile = convertedFiles.find(({ meta }) => meta.type === FILE_TYPES.MAIN);

    if (mainDataFile) {
        actions.importBasePropertiesAction(mainDataFile.basePropertiesList);
        actions.importSpritePropertiesAction(mainDataFile.spritePropertiesList);
        actions.importEntityDataAction(mainDataFile.entityTypesList);
        actions.importTreeDataAction(mainDataFile.treeData);
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
        const onResourcesConverted = (convertedResources) => {
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
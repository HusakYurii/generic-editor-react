import React from "react";
import { connect } from "react-redux";
import "./header.css";

import store from "../../store";
import { importEntityDataAction } from "../../store/entityTypes";
import { importBasePropertiesAction } from "../../store/properties/base";
import { importSpritePropertiesAction } from "../../store/properties/sprite";
import { importResourcesAction } from "../../store/resources";
import { importTreeDataAction } from "../../store/tree";
import { base64ImageToFile, convertImageFileToBase64, convertJSONFilesToText, createJSONLoader, exportJSONFile } from "../../tools/resourcesTools";
import { VERSION } from "../../VERSION";


/**
 * 
 * @param {Array<[string, File]>} queue 
 * @param {{[id: string]: {name: string; url: string;}}} memo 
 * @param {(data: {[id: string]: {name: string; url: string;}}) => void} onFinish 
 * @returns 
 */
const convertResourcesRecursively = (queue, memo, onFinish) => {
    if (queue.length === 0) {
        onFinish(memo);
        return;
    }

    const [id, file] = queue.shift();

    convertImageFileToBase64(file, (data) => {
        memo[id] = data;
        convertResourcesRecursively(queue, memo, onFinish);
    });
}


/**
 * To save resources which are used and export them in the map in base 64 format
 * @param {import("../../store").IStore} store 
 */
const exportResourcesAsBase64 = (store) => {
    const { resourcesList, spritePropertiesList } = store.getState();

    const resourcesToExport = Object.values(spritePropertiesList).reduce((acc, properties) => {
        if (properties.resourceID) {
            acc.push([properties.resourceID, resourcesList[properties.resourceID]])
        }
        return acc;
    }, []);

    convertResourcesRecursively(resourcesToExport, {}, (resources) => {
        exportJSONFile(
            JSON.stringify({
                meta: {
                    version: VERSION,
                    type: "data-resources-base64",
                    description: "This file contains the resources. The resources are in base64 format"
                },
                resources
            }, null, 2),
            "assesMapAsBase64.json"
        );
    });
};

/**
 * To make a bundle with all the data and save it as json file
 * @param {import("../../store").IStore} store 
 */
const exportMainData = (store) => {
    const { tree, entityTypesList, basePropertiesList, spritePropertiesList } = store.getState();

    exportJSONFile(
        JSON.stringify({
            meta: {
                version: VERSION,
                type: "data-main",
                description: "This file is a bundle and contains the tree hierarchy, entity types each node represents, base and sprite properties"
            },
            treeData: tree.treeData,
            entityTypesList,
            basePropertiesList,
            spritePropertiesList
        }, null, 2),
        "mainData.json"
    );
};

/**
 * @typedef {{
 * importEntityDataAction: typeof importEntityDataAction; 
 * importBasePropertiesAction: typeof importBasePropertiesAction; 
 * importSpritePropertiesAction: typeof importSpritePropertiesAction; 
 * importResourcesAction: typeof importResourcesAction; 
 * importTreeDataAction: typeof importTreeDataAction;
 * }} HeaderComponentDependencies
 */

/**
* Each node must have base properties
* @param { HeaderComponentDependencies} props 
*/
export const HeaderComponent = (props) => {

    const exportData = () => {
        exportMainData(store);
        exportResourcesAsBase64(store);
    };

    const importData = () => {
        const jsonLoader = createJSONLoader((files) => {
            convertJSONFilesToText(files, (convertedFiles) => {

                /**
                 * @param {Array<[string, File]>} queue 
                 * @param {object} memo 
                 * @param {(daa: object) => void} onFinish 
                 * @returns 
                 */
                const convertResourcesRecursively = (queue, memo, onFinish) => {
                    if (queue.length === 0) {
                        onFinish(memo);
                        return;
                    }

                    const [id, file] = queue.shift();

                    base64ImageToFile(file, (data) => {
                        memo[id] = data;
                        convertResourcesRecursively(queue, memo, onFinish);
                    });
                }

                const dataFiles = convertedFiles.map((file) => JSON.parse(file.url));


                const mainDataFile = dataFiles.find(({ meta }) => meta.type === "data-main");
                if (mainDataFile) {
                    props.importBasePropertiesAction(mainDataFile.basePropertiesList);
                    props.importSpritePropertiesAction(mainDataFile.spritePropertiesList);
                    props.importEntityDataAction(mainDataFile.entityTypesList);
                    props.importTreeDataAction(mainDataFile.treeData);
                }

                const resourcesDataFile = dataFiles.find(({ meta }) => meta.type === "data-resources-base64");
                if (resourcesDataFile) {
                    convertResourcesRecursively(
                        Object.entries(resourcesDataFile.resources), {}, (convertedResources) => {
                            props.importResourcesAction(convertedResources);
                        });
                }
            });
        });
        jsonLoader.click();

    }

    return (
        <header>
            <div id="processor-options">
                <span onClick={importData} id="upload-option">Upload File</span>
                <span onClick={exportData} id="export-option">Export File</span>
            </div>
            <div>
                <span>Docs</span>
                <span>About</span>
                <span>Report Bug</span>
            </div>
        </header>
    );
};


const mapStateToProps = (store) => {
    return {}
};

export const Header = connect(
    mapStateToProps,
    {
        importEntityDataAction,
        importBasePropertiesAction,
        importSpritePropertiesAction,
        importResourcesAction,
        importTreeDataAction,
    }
)(HeaderComponent)
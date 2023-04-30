import React from "react";
import "./header.css";
import store from "../../store";
import { convertFileToBase64, exportJSONFile } from "../../tools/resourcesTools";
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

    convertFileToBase64(file, (data) => {
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


export const Header = () => {

    const exportData = () => {
        exportMainData(store);
        exportResourcesAsBase64(store);
    };

    return (
        <header>
            <div id="processor-options">
                <span id="upload-option">Upload File</span>
                <span onClick={exportData} id="export-option">Export File</span>
            </div>
            <div>
                <span>Docs</span>
                <span>About</span>
                <span>Report Bug</span>
            </div>
        </header>
    );
}
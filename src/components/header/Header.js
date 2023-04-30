import React from "react";
import "./header.css";
import store from "../../store";
import { convertFileToBase64, exportJSONFile } from "../../tools/resourcesTools";

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


export const Header = () => {

    const exportData = () => {
        const { tree, entityTypesList, resourcesList, basePropertiesList, spritePropertiesList } = store.getState();

        exportJSONFile(
            JSON.stringify({ treeData: tree.treeData, entityTypesList, basePropertiesList, spritePropertiesList }, null, 2),
            "mainData.json"
        );

        convertResourcesRecursively(Object.entries(resourcesList), {}, (resources) => {
            exportJSONFile(
                JSON.stringify(resources, null, 2),
                "assesMapAsBase64.json"
            );
        });
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
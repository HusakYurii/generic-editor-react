import React, { useState } from "react";
import { connect } from "react-redux";
import "./header.css";

import store from "../../store";
import { importEntityDataAction } from "../../store/entityTypes";
import { importBasePropertiesAction } from "../../store/properties/base";
import { importSpritePropertiesAction } from "../../store/properties/sprite";
import { importNineSliceSpritePropertiesAction } from "../../store/properties/nineSliceSprite";
import { importGraphicsPropertiesAction } from "../../store/properties/graphics";
import { importTextPropertiesAction } from "../../store/properties/text";
import { importResourcesAction } from "../../store/resources";
import { importTreeDataAction } from "../../store/tree";
import { importData } from "./features/importLogic";
import { exportData } from "./features/exportLogic";
import { ModalPopup } from "./ModalPopup";
import { createNewProject, exportDataAndCreateNew } from "./features/createNewProjectLogic";

/**
 * @typedef {{
 * importEntityDataAction: typeof importEntityDataAction; 
 * importBasePropertiesAction: typeof importBasePropertiesAction; 
 * importSpritePropertiesAction: typeof importSpritePropertiesAction; 
 * importResourcesAction: typeof importResourcesAction; 
 * importTreeDataAction: typeof importTreeDataAction;
 * importNineSliceSpritePropertiesAction: typeof importNineSliceSpritePropertiesAction;
 * importGraphicsPropertiesAction: typeof importGraphicsPropertiesAction;
 * importTextPropertiesAction: typeof importTextPropertiesAction;
 * }} HeaderComponentDependencies
 */

/**
* Each node must have base properties
* @param { HeaderComponentDependencies} props 
*/
export const HeaderComponent = (props) => {
    const [isModalVisible, setModalVisibility] = useState(false);

    return (
        <header>
            <div id="processor-options">
                <span>File</span>
                <div id="options">
                    <span onClick={() => setModalVisibility(true)}>New Project</span>
                    <span onClick={() => importData(props)}>Import Files</span>
                    <span onClick={() => exportData(store)}>Export Files</span>
                </div>
            </div>
            <div>
                <span>Docs</span>
                <span>About</span>
                <span>Report Bug</span>
            </div>
            <ModalPopup
                isVisible={isModalVisible}
                onClose={() => setModalVisibility(false)}
                onConfirm={() => {
                    setModalVisibility(false);
                    exportDataAndCreateNew(store, props);
                }}
                onReject={() => {
                    setModalVisibility(false);
                    createNewProject(props);
                }}
            />
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
        importNineSliceSpritePropertiesAction,
        importGraphicsPropertiesAction,
        importTextPropertiesAction
    }
)(HeaderComponent)
import React from "react";
import { connect } from "react-redux";
import "./header.css";

import store from "../../store";
import { importEntityDataAction } from "../../store/entityTypes";
import { importBasePropertiesAction } from "../../store/properties/base";
import { importSpritePropertiesAction } from "../../store/properties/sprite";
import { importResourcesAction } from "../../store/resources";
import { importTreeDataAction } from "../../store/tree";
import { importData } from "./features/importLogic";
import { exportData } from "./features/exportLogic";

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



    return (
        <header>
            <div id="processor-options">
                <span onClick={() => importData(props)} id="upload-option">Upload File</span>
                <span onClick={() => exportData(store)} id="export-option">Export File</span>
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
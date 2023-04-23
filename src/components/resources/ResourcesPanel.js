import React from "react";
import { connect } from "react-redux";

import "./resourcesPanel.css";
import { addResourceAction, removeResourceAction } from "../../store/resources"
import { ImageElement } from "./ImageElement";
import { ImageLoader } from "./loaders/GenericLoader";


/**
 * @typedef {{
 * resourcesList: import("../../store/resources").IResourcesListState;
 * addResourceAction: typeof addResourceAction;
 * removeResourceAction: typeof removeResourceAction;
 * }} ResourcesPanelComponentDependencies
 */

/**
 * @param { ResourcesPanelComponentDependencies} props 
 */
const ResourcesPanelComponent = (props) => {

    const getImageElements = (resources) => {
        return Object.keys(resources).map((id) => {
            return <ImageElement key={id} id={id} resource={resources[id]} />
        })
    };

    return (
        <div id="files-preview">
            {getImageElements(props.resourcesList)}
        </div>
    )
}


/**
 * @param {import("../../store").IStore} data 
 */
const mapStateToProps = ({ resourcesList }) => {
    return {
        resourcesList
    }
};

export const ResourcesPanel = connect(
    mapStateToProps, {}
)(ResourcesPanelComponent)
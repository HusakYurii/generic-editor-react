import React from "react";
import { connect } from "react-redux";

import "./resourcesPanel.css";
import { addResourceAction, removeResourceAction } from "../../store/resources"
import { ImageElement } from "./elements/ImageElement";


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

    const mock = {
        1: { name: "Name", url: `https://picsum.photos/200/300?random=${Math.ceil(Math.random() * 10000)}` },
        2: { name: "Second Name", url: `https://picsum.photos/200/300?random=${Math.ceil(Math.random() * 10000)}` },
        3: { name: "Another Name", url: `https://picsum.photos/200/300?random=${Math.ceil(Math.random() * 10000)}` },
        4: { name: "View of something", url: `https://picsum.photos/200/300?random=${Math.ceil(Math.random() * 10000)}` },
        5: { name: "Dog, maybe?", url: `https://picsum.photos/200/300?random=${Math.ceil(Math.random() * 10000)}` },
        6: { name: "Dog, maybe?", url: `https://picsum.photos/200/300?random=${Math.ceil(Math.random() * 10000)}` },
        7: { name: "Dog, maybe?", url: `https://picsum.photos/200/300?random=${Math.ceil(Math.random() * 10000)}` },
        8: { name: "Dog, maybe?", url: `https://picsum.photos/200/300?random=${Math.ceil(Math.random() * 10000)}` },
    }
    const getImageElements = (resources) => {
        return Object.keys(resources).map((id) => {
            return <ImageElement key={id} id={id} resource={resources[id]} />
        })
    };

    return (
        <div id="files-preview" data-type="resources-panel">
            {getImageElements(mock)}
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
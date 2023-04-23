import React from "react";
import { connect } from "react-redux";

import "./resourcesPanel.css";
import { ImageElement } from "./ImageElement";


/**
 * @typedef {{
 * resources: Record<number, unknown>
 * }} ResourcesPanelComponentDependencies
 */

/**
 * @param { ResourcesPanelComponentDependencies} props 
 */
const ResourcesPanelComponent = (props) => {

    const mockData = {
        124123: { name: "Name", url: `https://picsum.photos/200/300?random=${Math.ceil(Math.random() * 10000)}` },
        435234: { name: "Another name", url: `https://picsum.photos/200/300?random=${Math.ceil(Math.random() * 10000)}` },
        945834: { name: "Long name to test", url: `https://picsum.photos/200/300?random=${Math.ceil(Math.random() * 10000)}` },
    }
    const getImageElements = (resources) => {
        return Object.keys(resources).map((id) => {
            return <ImageElement key={id} id={id} resource={resources[id]} />
        })
    };

    return (
        <div id="files-preview">
            {getImageElements(mockData)}
        </div>
    )
}


/**
 * @param {import("../../../store").IStore} data 
 */
const mapStateToProps = ({ }) => {
    return {
    }
};

export const ResourcesPanel = connect(
    mapStateToProps, {}
)(ResourcesPanelComponent)
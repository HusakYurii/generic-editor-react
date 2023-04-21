import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import "./treeOptionsPopup.css";

import { NODE_DATA_TYPE_ATTRIBUTE } from "../tree";


const TreeOptionsPopupComponent = () => {

    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [isVisible, setVisibility] = useState(false);
    const popupRef = useRef(null);

    const onContextmenu = ({ target, clientX, clientY }) => {
        const attribute = target.getAttribute("data-type");
        if (attribute && attribute === NODE_DATA_TYPE_ATTRIBUTE) {
            setVisibility(true);
            setPosition({ top: clientY - 5, left: clientX - 5 });
        }
    };

    useEffect(() => {
        window.addEventListener("contextmenu", onContextmenu);
        return () => window.removeEventListener("contextmenu", onContextmenu);
    }, []);

    const onMouseleave = () => {
        setVisibility(false);
        setPosition({ top: 0, left: 0 });
    };

    useEffect(() => {
        // we know that when the useEffect fires the ref element will be there
        popupRef.current.addEventListener("mouseleave", onMouseleave);
        return () => popupRef.current.removeEventListener("mouseleave", onMouseleave);
    }, []);

    const onClick = (event) => {
        console.log(event.target);
    }

    return (
        <div
            id="tree-options-popup"
            ref={popupRef}
            style={{ ...position, display: isVisible ? "block" : "none" }}
            onClick={onClick}
        >
            <div data-entity-type="container">Add Container</div>
            <div data-entity-type="sprite">Add Sprite</div>
            <div data-entity-type="remove" className="remove-option">Remove</div>
        </div>
    );
};

/**
 * @param {import("../../store").IStore} data 
 */
const mapStateToProps = ({ tree }) => {
    return {};
};


export const TreeOptionsPopup = connect(
    mapStateToProps,
    {}
)(TreeOptionsPopupComponent)

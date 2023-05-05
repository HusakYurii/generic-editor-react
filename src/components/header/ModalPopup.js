import React from "react";
import "./modalPopup.css";


/**
 * @typedef {{
 * isVisible: boolean;
 * onClose: ()=> void;
 * }} ModalPopupDependencies
 */

/**
* @param { ModalPopupDependencies } props 
*/
export const ModalPopup = (props) => {
    return (
        <div id="modal" className={props.isVisible ? "shown" : ""}>
            <div id="modal-content">
                <span id="close" onClick={props.onClose}>&times;</span>
                <div>
                    <p>@TODO Think of properties to configure using this popup. One thing can be is the canvas ratio</p>
                </div>
            </div>
        </div>
    );
};
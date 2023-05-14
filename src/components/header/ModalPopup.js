import React from "react";
import "./modalPopup.css";


/**
 * @typedef {{
 * isVisible: boolean;
 * onClose: ()=> void;
 * onConfirm: ()=> void;
 * onReject: ()=> void;
 * }} ModalPopupDependencies
 */

/**
* @param { ModalPopupDependencies } props 
*/
export const ModalPopup = (props) => {
    return (
        <div id="modal" className={props.isVisible ? "shown" : ""}>
            <div id="modal-content">
                <span className="closeCrossButton" onClick={props.onClose}>&times;</span>
                <div>
                    <p className="modalMessage">Do you want to save the current project?</p>
                </div>
                <div id="modal-buttons">
                    <button className="confirmButton" onClick={props.onConfirm}>Yes</button>
                    <button className="cancelButton" onClick={props.onReject}>No</button>
                </div>
            </div>
        </div>
    );
};
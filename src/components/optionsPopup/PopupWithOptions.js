import React, { useState, useEffect, useRef } from "react";

import "./popupWithOptions.css";

export const REMOVE_OPTION = "REMOVE";

/**
 * @typedef {{
 *  canShowRemoveOption: (hoveredElement: HTMLElement) => boolean;
 *  canProcessContextMenu: (event: MouseEvent) => boolean;
 *  canProcessClick: (event: MouseEvent) => boolean;
 *  processClick: (event: MouseEvent) => boolean;
 *  optionsMap: Array<{id: number, option: string}>;
 * }} PopupWithOptionsDependencies
 */

/**
 * @param { PopupWithOptionsDependencies} props 
 */
export const PopupWithOptions = (props) => {

    const [options, setOptions] = useState({
        position: { top: 0, left: 0 },
        isVisible: false,
        hoveredElement: null
    });
    const popupRef = useRef(null);

    useEffect(() => {
        window.addEventListener("contextmenu", onContextmenu);
        return () => window.removeEventListener("contextmenu", onContextmenu);
    }, []);

    useEffect(() => {
        // we know that when the useEffect fires the ref element will be there
        popupRef.current.addEventListener("mouseleave", onMouseleave);
        return () => popupRef.current.removeEventListener("mouseleave", onMouseleave);
    }, []);

    const onContextmenu = (event) => {
        if (!props.canProcessContextMenu(event)) { return; }

        const { target, clientX, clientY } = event;
        setOptions({
            position: { top: clientY - 5, left: clientX - 5 },
            hoveredElement: target,
            isVisible: true
        });
    };

    const onMouseleave = () => {
        setOptions({
            position: { top: 0, left: 0 },
            isVisible: false,
            hoveredElement: null
        });
    };

    const onClick = (event) => {
        if (!props.canProcessClick(event)) { return; }

        props.processClick(event, options.hoveredElement);
        onMouseleave();
    }

    const calculateStyle = (element) => {
        return { display: props.canShowRemoveOption(element) ? "block" : "none" }
    };

    return (
        <div
            className="options-popup"
            ref={popupRef}
            onClick={onClick}
            style={{ ...options.position, display: options.isVisible ? "block" : "none" }}
        >
            {props.optionsMap.map(({ id, option }) => <div key={id} data-option={id}>{option}</div>)}
            {/* props.canShowRemoveOption will decide when this option is available */}
            <div data-option={REMOVE_OPTION} className="remove-option" style={{ ...calculateStyle(options.hoveredElement) }}>Remove</div>
        </div>
    );
};


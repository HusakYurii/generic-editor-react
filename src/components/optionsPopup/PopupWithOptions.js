import React, { useState, useEffect, useRef } from "react";

import "./popupWithOptions.css";

/**
 * @typedef {{
 *  canProcessContextMenu: (event: MouseEvent) => boolean;
 *  canProcessClick: (event: MouseEvent) => boolean;
 *  processClick: (event: MouseEvent) => boolean;
 *  optionsMap: Array<{option: string, label: string, className?: sting; canShow: (target: HTMLElement) => boolean}>;
 * }} PopupWithOptionsDependencies
 */

/**
 * @param { PopupWithOptionsDependencies} props 
 */
export const PopupWithOptions = (props) => {

    const [data, setData] = useState({
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
        setData({
            position: { top: clientY - 5, left: clientX - 5 },
            hoveredElement: target,
            isVisible: true
        });
    };

    const onMouseleave = () => {
        setData({
            position: { top: 0, left: 0 },
            isVisible: false,
            hoveredElement: null
        });
    };

    const onClick = (event) => {
        if (!props.canProcessClick(event)) { return; }

        props.processClick(event, data.hoveredElement);
        onMouseleave();
    }

    return (
        <div
            className="options-popup"
            ref={popupRef}
            onClick={onClick}
            style={{ ...data.position, display: data.isVisible ? "block" : "none" }}
        >
            {props.optionsMap.map((params, index) => {
                const { option, label, canShow, className = "" } = params;

                return <div
                    key={index}
                    data-option={option}
                    className={className}
                    style={{ display: canShow(data.hoveredElement) ? "block" : "none" }}
                >{label}</div>
            })}
        </div>
    );
};


import React, { useState, useEffect, useRef, useCallback } from "react";

import "./popupWithOptions.css";

/**
 * @typedef {{
 *  canProcessContextMenu: (event: MouseEvent) => boolean;
 *  canProcessClick: (event: MouseEvent) => boolean;
 *  processClick: (event: MouseEvent) => boolean;
 *  optionsMap: Array<{option: string, label: string, className?: sting; isAvailable: (target: HTMLElement) => boolean}>;
 * }} PopupWithOptionsDependencies
 */

/**
 * @param { PopupWithOptionsDependencies} props 
 */
export const PopupWithOptions = (props) => {

    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [data, setData] = useState({ isVisible: false, hoveredElement: null });

    const mousePosition = useRef({ x: 0, y: 0 });
    const popupRef = useRef(document.createElement("div"));

    useEffect(() => {
        window.addEventListener("contextmenu", onContextmenu);
        return () => window.removeEventListener("contextmenu", onContextmenu);
    }, []);

    useEffect(() => {
        // we know that when the useEffect fires the ref element will be there
        popupRef.current.addEventListener("mouseleave", onMouseleave);
        return () => popupRef.current.removeEventListener("mouseleave", onMouseleave);
    }, []);

    useEffect(() => {
        if (!data.isVisible) {
            return;
        }

        const mouseMargin = 10;
        const { x, y } = mousePosition.current;
        const { offsetWidth, offsetHeight } = popupRef.current;

        const offsetX = (x + offsetWidth) - window.innerWidth;
        const offsetY = (y + offsetHeight) - window.innerHeight;

        const top = offsetY > 0 ? (y - offsetHeight + mouseMargin) : y - mouseMargin;
        const left = offsetX > 0 ? (x - offsetWidth + mouseMargin) : x - mouseMargin;
        // correct positions just in case if we are out of the bounds
        setPosition({ top, left });

    }, [data.isVisible])

    const onContextmenu = useCallback((event) => {
        if (!props.canProcessContextMenu(event)) { return; }

        const { target, clientX, clientY } = event;
        mousePosition.current.x = clientX;
        mousePosition.current.y = clientY;

        setData({ hoveredElement: target, isVisible: true });
        setPosition({ top: clientY, left: clientY });
    }, []);

    const onMouseleave = useCallback(() => {
        setData({ isVisible: false, hoveredElement: null });
    }, []);

    const onClick = useCallback((event) => {
        if (!props.canProcessClick(event)) { return; }

        props.processClick(event, data.hoveredElement);
        onMouseleave();
    }, [data.hoveredElement]);

    return (
        <div
            className="options-popup"
            ref={popupRef}
            onClick={onClick}
            style={{ ...position, display: data.isVisible ? "block" : "none" }}
        >
            {props.optionsMap.map((params, index) => {
                const { option, label, isAvailable, className = "" } = params;

                return <div
                    key={index}
                    data-option={option}
                    className={className}
                    style={{ display: isAvailable(data.hoveredElement) ? "block" : "none" }}
                >{label}</div>
            })}
        </div>
    );
};


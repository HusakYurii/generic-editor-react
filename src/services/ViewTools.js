import { Point, DisplayObject } from "pixi.js"

/**
 * The instance name of the object.
 * @memberof PIXI.DisplayObject#
 * @member {string} name
 */
DisplayObject.prototype.name = null;

/**
 * Returns the display object in the container.
 *
 * Recursive searches are done in a preorder traversal.
 * @param {PIXI.DisplayObject} element child with the specified name.
 * @param {string} name - Instance name.
 * @param {boolean}[deep=false] - Whether to search recursively
 * @returns {PIXI.DisplayObject} The child with the specified name.
 */

export const getChildByName = (element, name) => {
    for (let i = 0, j = element.children.length; i < j; i++) {
        if (element.children[i].name === name) {
            return element.children[i];
        }
    }


    for (let i = 0, j = element.children.length; i < j; i++) {
        const child = element.children[i];

        if (!child.getChildByName) {
            continue;
        }

        const target = getChildByName(child, name);

        if (target) {
            return target;
        }
    }

    return null;
};


/**
 * Sometimes it happens that we need to know an element's position
 * as if it was added to another container.
 * 
 * 
 * @param {PIXI.Container} element 
 * @param {PIXI.Container} newParentElement 
 * @returns {PIXI.Point}
 */
export const getChildRelativePosition = (element, newParentElement) => {
    const globalPosition = element.toGlobal(new Point());
    const localPosition = newParentElement.toLocal(globalPosition);
    return localPosition;
};


/**
 * There is no way to get the elements rotation including the parents' rotation
 * It is like a global rotation
 * @param {PIXI.Container} element 
 * @param {boolean} [includeOwnRotation]  sometimes it is not necessary to include the elements rotation
 * @returns {number}
 */
export const getGlobalRotation = (element, includeOwnRotation = true) => {
    let globalRotation = includeOwnRotation ? element.rotation : 0;

    let parentContainer = element.parent;
    while (parentContainer) {
        globalRotation += parentContainer.rotation;
        parentContainer = parentContainer.parent;
    }

    return globalRotation;
};
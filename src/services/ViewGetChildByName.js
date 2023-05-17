import { DisplayObject } from 'pixi.js';

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

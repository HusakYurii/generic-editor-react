import { Container, DisplayObject } from 'pixi.js';

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
 * @method getChildByName
 * @memberof PIXI.Container#
 * @param {string} name - Instance name.
 * @param {boolean}[deep=false] - Whether to search recursively
 * @returns {PIXI.DisplayObject} The child with the specified name.
 */
Container.prototype.getChildByName = function getChildByName(name) {
    for (let i = 0, j = this.children.length; i < j; i++) {
        if (this.children[i].name === name) {
            return this.children[i];
        }
    }


    for (let i = 0, j = this.children.length; i < j; i++) {
        const child = this.children[i];

        if (!child.getChildByName) {
            continue;
        }

        const target = child.getChildByName(name);

        if (target) {
            return target;
        }
    }

    return null;
};

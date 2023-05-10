import { createStore, combineReducers } from 'redux';
import { treeReducer } from "./tree";
import { basePropertiesListReducer } from "./properties/base";
import { spritePropertiesListReducer } from "./properties/sprite";
import { entityTypesListReducer } from "./entityTypes";
import { resourcesListReducer } from "./resources";
import { graphicsPropertiesListReducer } from './properties/graphics';
import { nineSliceSpritePropertiesListReducer } from './properties/nineSliceSprite';

/**
 * @typedef {{
 * tree: import("./tree").ITreeState;
 * basePropertiesList: import("./properties/base").IBasePropertiesListState;
 * spritePropertiesList: import("./properties/sprite").ISpritePropertiesListState;
 * nineSliceSpritePropertiesList: import("./properties/nineSliceSprite").INineSliceSpritePropertiesListState
 * graphicsList: import("./properties/graphics").IGraphicsPropertiesListState;
 * entityTypesList: import("./entityTypes").IEntityTypesListState;
 * resourcesList: import("./resources").IResourcesListState;
 * }} IStore
 */

/**
 * @type {{getState: () => IStore}};
 */
const store = createStore(combineReducers({
    // tree of nodes hierarchy
    tree: treeReducer,
    // contains the data about the components each entity has
    entityTypesList: entityTypesListReducer,
    // map of id to base properties for nodes which have it
    basePropertiesList: basePropertiesListReducer,
    // map of id to sprite properties for nodes which have it
    spritePropertiesList: spritePropertiesListReducer,
    // map of id to 9 slice sprite properties for nodes which have it
    nineSliceSpritePropertiesList: nineSliceSpritePropertiesListReducer,
    // all graphics data
    graphicsList: graphicsPropertiesListReducer,
    // all the Files loaded by a user
    resourcesList: resourcesListReducer
}));

export default store;
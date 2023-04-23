import { createStore, combineReducers } from 'redux';
import { treeReducer } from "./tree";
import { basePropertiesListReducer } from "./properties/base";
import { spritePropertiesListReducer } from "./properties/sprite";
import { entityTypesListReducer } from "./entityTypes";
import { resourcesListReducer } from "./resources";

/**
 * @typedef {{
 * tree: import("./tree").ITreeState;
 * basePropertiesList: import("./properties/base").IBasePropertiesListState;
 * spritePropertiesList: import("./properties/sprite").ISpritePropertiesListState;
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
    // map of id to base properties for nodes which have it
    basePropertiesList: basePropertiesListReducer,
    // map of id to sprite properties for nodes which have it
    spritePropertiesList: spritePropertiesListReducer,
    // contains the data about the components each entity has
    entityTypesList: entityTypesListReducer,
    // all the Files loaded by a user
    resourcesList: resourcesListReducer
}));

export default store;
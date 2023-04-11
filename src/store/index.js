import { createStore, combineReducers } from 'redux';
import { treeReducer } from "./tree";
import { basePropertiesListReducer } from "./properties/base";
import { spritePropertiesListReducer } from "./properties/sprite";
import { nodesPropertiesListReducer } from "./nodeProperties";

/**
 * @typedef {{
 * treeReducer: import("./tree").ITreeState;
 * basePropertiesListReducer: import("./properties/base").IBasePropertiesListState;
 * spritePropertiesListReducer: import("./properties/sprite").ISpritePropertiesListState;
 * nodesPropertiesListReducer: import("./nodeProperties").INodesPropertiesListState;
 * }} IStore
 */


const store = createStore(combineReducers({
    // tree of nodes hierarchy
    treeReducer,
    // map of id to base properties for nodes which have it
    basePropertiesListReducer,
    // map of id to sprite properties for nodes which have it
    spritePropertiesListReducer,
    // contains the data about the components each node has
    nodesPropertiesListReducer
}));

export default store;
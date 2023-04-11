import { createStore, combineReducers } from 'redux';
import { treeReducer } from "./tree";
import { nodesPropertiesListReducer, nodesSpritePropertiesListReducer } from "./nodeProperties"

const store = createStore(combineReducers({
    treeReducer,
    nodesPropertiesListReducer,
    nodesSpritePropertiesListReducer
}));

export default store;
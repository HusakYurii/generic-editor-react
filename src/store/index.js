import { createStore, combineReducers } from 'redux';
import { treeReducer } from "./tree";
import { nodesPropertiesListReducer } from "./nodeProperties"

const store = createStore(combineReducers({
    treeReducer,
    nodesPropertiesListReducer
}));

export default store;
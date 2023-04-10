import { createStore, combineReducers } from 'redux';
import { treeReducer } from "./tree";

const store = createStore(combineReducers({
    treeReducer
}));

export default store;
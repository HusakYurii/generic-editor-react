import { createStore, combineReducers } from 'redux';
import { treeReducer } from "./treeReducer";

const store = createStore(combineReducers({
    treeReducer
}));

export default store;
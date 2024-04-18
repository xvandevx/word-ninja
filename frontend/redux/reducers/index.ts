// @ts-ignore
import {combineReducers} from 'redux'
import {HYDRATE} from "next-redux-wrapper";
import {popupReducer} from "./popupReducer";
import {wordReducer} from "~/redux/reducers/wordReducer";
import {categoryReducer} from "~/redux/reducers/categoryReducer";
import {stateReducer} from "~/redux/reducers/stateReducer";

const rootReducer = combineReducers({
    popup: popupReducer,
    word: wordReducer,
    category: categoryReducer,
    state: stateReducer,
})

export const reducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};
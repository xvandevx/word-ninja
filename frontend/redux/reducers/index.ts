// @ts-ignore
import {combineReducers} from 'redux'
import {HYDRATE} from "next-redux-wrapper";
import {popupReducer} from "./popupReducer";
import {wordReducer} from "~/redux/reducers/wordReducer";

const rootReducer = combineReducers({
    popup: popupReducer,
    word: wordReducer,
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
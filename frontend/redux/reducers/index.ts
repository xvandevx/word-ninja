// @ts-ignore
import {combineReducers} from 'redux'
import {HYDRATE} from "next-redux-wrapper";
import {popupReducer} from "./popupReducer";
import {wordReducer} from "~/redux/reducers/wordReducer";
import {categoryReducer} from "~/redux/reducers/categoryReducer";
import {stateReducer} from "~/redux/reducers/stateReducer";
import {sentenceReducer} from "~/redux/reducers/sentenceReducer";
import {learnReducer} from "~/redux/reducers/learnReducer";

const rootReducer = combineReducers({
    popup: popupReducer,
    word: wordReducer,
    category: categoryReducer,
    state: stateReducer,
    sentence: sentenceReducer,
    learn: learnReducer
})

export const reducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            //...action.payload,
        };
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};
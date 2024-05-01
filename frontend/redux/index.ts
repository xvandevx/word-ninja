// @ts-ignore
import {applyMiddleware, createStore} from 'redux';
import {createWrapper} from 'next-redux-wrapper';
import {reducer} from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';

// create a makeStore function
const makeStore = (context: any) => {
    return createStore(
        reducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
};

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {debug: false});
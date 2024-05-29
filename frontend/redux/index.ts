// @ts-ignore
import {applyMiddleware, createStore} from 'redux';
import {createWrapper} from 'next-redux-wrapper';
import {reducer} from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';

import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
export type AppDispatch = ThunkDispatch<any, any, AnyAction>;

const makeStore = (context: any) => {
    return createStore(
        reducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
};

export const wrapper = createWrapper(makeStore, {debug: false});
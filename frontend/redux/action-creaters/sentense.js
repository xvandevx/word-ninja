import {Api} from "../../api";

export const getSentences = () => {
    return async (dispatch, getState) => {
        const response = await Api.sentences.get()
        dispatch({type: 'FETCH_SENTENCES', payload: response})
    }
}


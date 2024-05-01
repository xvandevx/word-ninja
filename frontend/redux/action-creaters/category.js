import {Api} from "../../api";

export const getWordCategory = () => {
    return async (dispatch) => {
        const data = await Api.categorys.get()
        dispatch({type: 'FETCH_WORD_CATEGORYS', payload: data.filter(item => item.type === 1)})
    }
}

export const getSentenceCategory = () => {
    return async (dispatch) => {
        const data = await Api.categorys.get()
        dispatch({type: 'FETCH_SENTENCE_CATEGORYS', payload: data.filter(item => item.type === 2)})
    }
}
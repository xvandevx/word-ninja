import {Api} from "../../api";

export const getWords = () => {
    return async (dispatch) => {
        const response = await Api.words.getWord()
        dispatch({type: 'FETCH_WORDS', payload: response})
    }
}

export const getWordCategory = () => {
    return async (dispatch) => {
        const response = await Api.words.getWordCategory()
        dispatch({type: 'FETCH_WORD_CATEGORYS', payload: response})
    }
}
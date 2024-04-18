import {Api} from "../../api";

export const getWordCategory = () => {
    return async (dispatch) => {
        const data = await Api.categorys.getWordCategory()
        dispatch({type: 'FETCH_WORD_CATEGORYS', payload: data})
    }
}
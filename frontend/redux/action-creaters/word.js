import {Api} from "../../api";

export const getWords = () => {
    return async (dispatch, getState) => {
        const {state} = getState()
        const response = await Api.words.getWord(state.selectedCategory)
        dispatch({type: 'FETCH_WORDS', payload: response})
    }
}


import {Api} from "../../api";

export const getWords = () => {
    return async (dispatch, getState) => {
        const {state} = getState()
        const response = await Api.words.get(state.selectedCategory)
        dispatch({type: 'FETCH_WORDS', payload: response})
    }
}

export const updateWord = (newWord) => {
    return async (dispatch, getState) => {
        const {word} = getState()

        console.log('newWord', newWord)

        dispatch({type: 'FETCH_WORDS', payload: word.words.map(item => {
            if (newWord.id === item.id) {
                return newWord
            }
            return item;
        })})
    }
}

const initialState = {
    words: [],
    wordCategorys: '',
}

export const wordReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_WORDS':
            return {...state, words: action.payload}
        case 'FETCH_WORD_CATEGORYS':
            return {...state, wordCategorys: action.payload}
        default:
            return state
    }
}
const initialState = {
    wordCategorys: [],
    sentenceCategorys: [],
}

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_WORD_CATEGORYS':
            return {...state, wordCategorys: action.payload}
        case 'FETCH_SENTENCE_CATEGORYS':
            return {...state, sentenceCategorys: action.payload}
        default:
            return state
    }
}
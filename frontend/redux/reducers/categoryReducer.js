const initialState = {
    wordCategorys: [],
}

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_WORD_CATEGORYS':
            return {...state, wordCategorys: action.payload}
        default:
            return state
    }
}
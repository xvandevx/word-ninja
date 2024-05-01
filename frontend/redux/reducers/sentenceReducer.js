const initialState = {
    sentences: [],
}

export const sentenceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_SENTENCES':
            return {...state, sentences: action.payload}
        default:
            return state
    }
}
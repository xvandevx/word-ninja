const initialState = {
    word: {},
    learningWordIds: [],
    learnedWordIds: [],
}

export const learnReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LEARN_WORD':
            return {...state, words: action.payload}
        case 'SET_LEARNING_WORD_IDS':
            return {...state, learningWordIds: action.payload}
        case 'SET_LEARNED_WORD_IDS':
            return {...state, learnedWordIds: action.payload}
        default:
            return state
    }
}
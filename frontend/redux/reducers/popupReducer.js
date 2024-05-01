export const popupTypes = {
    none: 'none',
    auth: 'auth',
    addWord: 'addWord',
    addWords: 'addWords',
    addCategory: 'addCategory',
    addSentence: 'addSentence',
}


const initialState = {
    visibleType: popupTypes.none,
    data: {}
}

export const popupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_POPUP':
            return {...state, visibleType: action.payload}
        case 'SET_POPUP_DATA':
            return {...state, data: action.payload}
        default:
            return state
    }
}
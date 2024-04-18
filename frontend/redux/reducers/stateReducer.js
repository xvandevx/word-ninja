const initialState = {
    selectedCategory: '',
}

export const stateReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_CATEGORY':
            return {...state, selectedCategory: action.payload}
        default:
            return state
    }
}
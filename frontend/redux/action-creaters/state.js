export const setSelectedCategory = (categoryId) => {
    return async (dispatch) => {
        dispatch({type: 'SET_SELECTED_CATEGORY', payload: categoryId})
    }
}


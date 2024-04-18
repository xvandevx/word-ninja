export const showPopup = (value, payload = {}) => {
    return (dispatch) => {
        dispatch({type: 'SHOW_POPUP', payload: value})
        dispatch({type: 'SET_POPUP_DATA', payload: payload})
    }
}
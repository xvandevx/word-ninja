import {Api} from "../../api";

export const getLearnWord = () => {
    return async (dispatch) => {
        const data = await Api.categorys.get()
        dispatch({type: 'SET_LEARN_WORD', payload: data})
    }
}

export const getLearningWords = () => {
    return async (dispatch) => {
        const learningWords = localStorage.getItem('learningWords') || ''
        dispatch({type: 'SET_LEARNING_WORD_IDS', payload: learningWords.split(',').filter(word => word)})
    }
}

export const getLearnedWords = () => {
    return async (dispatch) => {
        const learnedWords = localStorage.getItem('learnedWords') || ''
        dispatch({type: 'SET_LEARNED_WORD_IDS', payload: learnedWords.split(',').filter(word => word)})
    }
}


export const setLearningWords = (ids) => {
    return async (dispatch) => {
        localStorage.setItem('learningWords', ids.join(','))
        dispatch({type: 'SET_LEARNING_WORD_IDS', payload: ids})
    }
}

export const setLearnedWords = (ids) => {
    return async (dispatch) => {
        localStorage.setItem('learnedWords', ids.join(','));
        dispatch({type: 'SET_LEARNED_WORD_IDS', payload: ids})
    }
}
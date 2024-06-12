import React from "react";
import {Button} from "@nextui-org/react";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {AppDispatch} from "~/redux";
import {useDispatch} from "react-redux";
import {showPopup} from "~/redux/action-creaters/popup";

export default function AddTabs({popupType = ''}) {
    const dispatch: AppDispatch = useDispatch();

    return <div className="flex gap-2 mb-2">
        <Button color={popupType === popupTypes.addWord ? 'primary' : 'default'} variant='bordered' size="sm" onClick={() => {
            dispatch(showPopup(popupTypes.addWord))
        }}>Word</Button>
        <Button color={popupType === popupTypes.addWords ? 'primary' : 'default'} variant='bordered' size="sm" onClick={() => {
            dispatch(showPopup(popupTypes.addWords))
        }}>Multiple words</Button>
        <Button color={popupType === popupTypes.addSentence ? 'primary' : 'default'} variant='bordered' size="sm" onClick={() => {
            dispatch(showPopup(popupTypes.addSentence))
        }}>Sentence</Button>
    </div>
}

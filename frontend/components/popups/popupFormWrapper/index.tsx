`use client`
import styles from "./index.module.scss";
import {useDispatch} from "react-redux";
import {showPopup} from "../../../redux/action-creaters/popup";
import {popupTypes} from "../../../redux/reducers/popupReducer";
import Link from "next/link";
import {Button} from "@nextui-org/react";
import AddTabs from "~/components/popups/tabs";
import {AppDispatch} from "~/redux";

export default function PopupFormWrapper({
    title = '',
    isLoading = false,
    onSubmit = () => {},
    additionalButton = null,
    errorText = '',
    children,
    topText = '',
    popupType = ''
}: any) {
    const dispatch: AppDispatch = useDispatch();

    const onHide = () => {
        dispatch(showPopup(popupTypes.none))
    }

    return (
        <>
            <AddTabs popupType={popupType}/>
            <h2>{title}</h2>
            <div className={styles.Content}>
                {topText && <div className={styles.TopText}>
                    {topText}
                </div>}
                {errorText && (
                    <span className={styles.Error}>{errorText}</span>
                )}
                {children}
            </div>
            <div className={styles.Buttom}>
                <Button onClick={onSubmit} isLoading={isLoading} isDisabled={isLoading}>Submit</Button>
                {additionalButton}
                <Button onClick={onHide} isDisabled={isLoading} variant="bordered">Cancel</Button>
            </div>
        </>
    )
}

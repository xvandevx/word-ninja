`use client`
import styles from "./index.module.scss";
import {useDispatch} from "react-redux";
import {showPopup} from "../../../redux/action-creaters/popup";
import {popupTypes} from "../../../redux/reducers/popupReducer";
import Link from "next/link";
import {Button} from "@nextui-org/react";

export default function PopupFormWrapper({
    title = '',
    isLoading = false,
    onSubmit = () => {},
    errorText = '',
    children,
    topText = ''
}: any) {
    const dispatch = useDispatch();

    const onHide = () => {
        // @ts-ignore
        dispatch(showPopup(popupTypes.none))
    }

    return (
        <>
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
                <Button onClick={onSubmit} isLoading={isLoading}>Submit</Button>
                <Button onClick={onHide} isLoading={isLoading}>Cancel</Button>
            </div>
        </>
    )
}

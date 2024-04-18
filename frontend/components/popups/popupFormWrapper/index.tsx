import Button from "/components/common/button";
import styles from "./index.module.scss";
import {useDispatch} from "react-redux";
import {showPopup} from "../../../redux/action-creaters/popup";
import {popupTypes} from "../../../redux/reducers/popupReducer";
import Link from "next/link";

export default function PopupFormWrapper({
    title = '',
    isLoading = false,
    isProcessing = false,
    onSubmit = () => {},
    errorText = '',
    successText = '',
    children = any,
    topText = ''
}) {
    const dispatch = useDispatch();

    const onHide = () => {
        dispatch(showPopup(popupTypes.none))
    }

    return (
        <>
            <h2>{title}</h2>
            {isLoading && (
                <div className={styles.Loader}>
                    Loading
                </div>
            )}
            {successText && (
                <>
                    <span>{successText}</span>
                    <div className={styles.Buttom}>
                        <Button onClick={onHide} label={'Закрыть'}/>
                    </div>
                </>
            )}
            {!isLoading && !successText && (
                <>
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
                        <Button onClick={onSubmit} isLoading={isProcessing}>Submit</Button>
                    </div>
                </>
            )}
        </>
    )
}

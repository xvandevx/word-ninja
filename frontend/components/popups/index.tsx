import styles from "./index.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {popupTypes} from "~/redux/reducers/popupReducer";
import Auth from './auth'
import {showPopup} from "~/redux/action-creaters/popup";
import {useEffect} from "react";
import AddWord from "~/components/popups/addWord";
import AddWords from "~/components/popups/addWords";
import AddSentence from "~/components/popups/addSentence";
import AddCategory from "~/components/popups/addCategory";

export default function Popups() {
    const {visibleType} = useSelector((state: any) => state.popup)
    const dispatch = useDispatch();

    useEffect( () => {
        const body = document.querySelector("body");
        if (visibleType === popupTypes.none) {
            // @ts-ignore
            body.classList.remove("popup");
        } else {
            // @ts-ignore
            body.classList.add("popup");
        }
    }, [visibleType] );

    const onHide = () => {
        // @ts-ignore
        dispatch(showPopup(popupTypes.none))
    }

    return visibleType !== popupTypes.none ? (
        <noindex><div className={styles.Wrapper} onClick={onHide}>
            <div className={styles.Popup} onClick={e => e.stopPropagation()}>
                <div className={styles.Content}>
                    <span className={styles.Close} onClick={onHide}></span>
                    {visibleType === popupTypes.auth && (
                        <Auth onHide={onHide}/>
                    )}
                    {visibleType === popupTypes.addWord && (
                        <AddWord onHide={onHide}/>
                    )}
                    {visibleType === popupTypes.addWords && (
                        <AddWords onHide={onHide}/>
                    )}
                    {visibleType === popupTypes.addCategory && (
                        <AddCategory onHide={onHide}/>
                    )}
                    {visibleType === popupTypes.addSentence && (
                        <AddSentence onHide={onHide}/>
                    )}
                </div>
            </div>
        </div></noindex>
    ) : null
}

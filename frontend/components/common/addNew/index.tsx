import styles from './index.module.scss'
import {AiOutlinePlus} from "react-icons/ai";
import {showPopup} from "~/redux/action-creaters/popup";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {AppDispatch} from "~/redux";
import {useDispatch} from "react-redux";

export default function AddNew() {
    const dispatch: AppDispatch = useDispatch();
    return (
        <div className={styles.AddNew} onClick={() => {
            dispatch(showPopup(popupTypes.addSentence))
        }}>
            <AiOutlinePlus />
        </div>
    )
}

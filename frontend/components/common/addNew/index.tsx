import styles from './index.module.scss'
import {AiOutlinePlus} from "react-icons/ai";
import {showPopup} from "~/redux/action-creaters/popup";
import {AppDispatch} from "~/redux";
import {useDispatch} from "react-redux";

export default function AddNew({popupType = ''}) {
    const dispatch: AppDispatch = useDispatch();
    return (
        <div className={styles.AddNew} onClick={() => {
            dispatch(showPopup(popupType))
        }}>
            <AiOutlinePlus />
        </div>
    )
}

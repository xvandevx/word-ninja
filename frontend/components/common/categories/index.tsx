import styles from './index.module.scss'
import {showPopup} from "~/redux/action-creaters/popup";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {useDispatch} from "react-redux";

export default function Categories({items}) {
    const dispatch = useDispatch();
    return (
        <div className={styles.Categories}>
            <div className={styles.Title}>Categories</div>
            <div className={styles.Items}>
                {items.map(item => (
                    <span key={item}>{item}</span>
                ))}
                <span onClick={() => {
                    dispatch(showPopup(popupTypes.addWordCategory))
                }}>+</span>
            </div>
        </div>
    )
}
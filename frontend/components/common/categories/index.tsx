import styles from './index.module.scss'
import {showPopup} from "~/redux/action-creaters/popup";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {useDispatch, useSelector} from "react-redux";
import clsx from "clsx";
import {setSelectedCategory} from "~/redux/action-creaters/state";
import {getWords} from "~/redux/action-creaters/word";

export default function Categories() {
    const dispatch = useDispatch();
    const {wordCategorys} = useSelector((state: any) => state.category)
    const {selectedCategory} = useSelector((state: any) => state.state)
    return (
        <div className={styles.Categories}>
            <div className={styles.Title}>Categories</div>
            <div className={styles.Items}>
                {wordCategorys?.map((item: any) => (
                    <span key={item.id} className={clsx(selectedCategory === item.id && styles.Selected)} onClick={() => {
                        dispatch(setSelectedCategory(item.id))
                        dispatch(getWords())
                    }}>{item.name}</span>
                ))}
                <span onClick={() => {
                    dispatch(showPopup(popupTypes.addWordCategory))
                }}>+</span>
            </div>
        </div>
    )
}
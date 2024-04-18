import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useMemo} from "react";

export default function Table({items}) {
    const dispatch = useDispatch();
    const {words} = useSelector((state: any) => state.word)
    const {wordCategorys} = useSelector((state: any) => state.category)
    const {selectedCategory} = useSelector((state: any) => state.state)

    const title = useMemo(() => {
        if (selectedCategory) {
            return wordCategorys.find(category => category.id === selectedCategory).name
        }
        return 'All words'
    }, [wordCategorys, selectedCategory])

    return (
        <div>
            <h1>{title}</h1>
            <div className={styles.Table}>
                <span className={styles.Head}>Word</span>
                <span className={styles.Head}>Translation</span>
                <span className={styles.Head}>Actions</span>
                {words.map(word => (
                    <>
                        <span>{word.name}</span>
                        <span>{word.translation}</span>
                        <span>{word.translation}</span>
                    </>
                ))}
            </div>
        </div>
    )
}
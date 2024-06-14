import styles from "./index.module.scss";
import clsx from "clsx";
import 'swiper/css';
import {
    BsArrowCounterclockwise, BsArrowRepeat, BsChevronCompactDown, BsChevronCompactUp,
} from "react-icons/bs";
import {useMemo, useState} from "react";
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai";
import {Button} from "@nextui-org/react";
import {Api} from "~/api";
import {getWords} from "~/redux/action-creaters/word";
import {AppDispatch} from "~/redux";
import {useDispatch} from "react-redux";
import {WordStatuses} from "~/types/words/word";
export default function Panel({isAllowReset, currentLikes, currentWordKey, learningWords, onResetSort, onStartOver, onResetLikes, onChangeIndex}: any) {
    const [isShowAll, setIsShowAll] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const liked = useMemo(() => {
        return Object.values(currentLikes).filter(item => item).length;
    }, [currentLikes])

    const disliked = useMemo(() => {
        return Object.values(currentLikes).filter(item => !item).length;
    }, [currentLikes])

    return (
        <div className='container'>
            <div className={styles.Panel}>
                <div className={styles.PanelBottons}>
                    <div onClick={() => onStartOver()} className={clsx((liked > 0 || disliked > 0) && styles.ResetButtonAllowed, styles.ResetButton)}>
                        <BsArrowCounterclockwise/>
                    </div>

                    <div
                        className={styles.PanelShow}
                        onClick={() => {
                            setIsShowAll(!isShowAll)
                        }}>
                        <span>{currentWordKey + 1} / {learningWords.length}</span>
                        {!isShowAll ? <BsChevronCompactDown/> : <BsChevronCompactUp/>}
                        <div className={styles.PanelLike}><AiOutlineDislike />{disliked}</div>
                        <div className={styles.PanelLike}><AiOutlineLike />{liked}</div>
                    </div>
                    <div onClick={() => onResetSort()}>
                        <BsArrowRepeat/>
                    </div>
                </div>

                {isShowAll && (
                    <>
                        <div className={styles.WordList}>
                            {learningWords.map((item: any, index: number) => (
                                <div
                                    key={item.id}
                                    className={clsx(currentWordKey === index && styles.WordListActive, currentLikes[item.id] === true && styles.WordListLiked, currentLikes[item.id] === false && styles.WordListDisliked)}
                                    onClick={() => onChangeIndex(index)}
                                >{item.word}</div>
                            ))}
                        </div>
                        {liked > 0 && (
                            <div className={styles.Bottom}>
                                <Button size="sm" color="warning" onClick={async () => {
                                    for (const item in currentLikes) {
                                        if (currentLikes[item]) {
                                            await Api.words.update(+item, {
                                                status: WordStatuses.Learned,
                                            });
                                        }
                                    }
                                    await dispatch(getWords());
                                    onResetLikes()
                                }}>Set all liked words as learned</Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
import styles from "./index.module.scss";
import {
    Button
} from "@nextui-org/react";
import {useDispatch, useSelector} from "react-redux";
import {useMemo, useRef, useState} from "react";
import {Api} from "~/api";
import {EditIcon} from "@nextui-org/shared-icons";
import {showPopup} from "~/redux/action-creaters/popup";
import {GoogleIcon} from "~/components/icons/google";
import {YandexIcon} from "~/components/icons/yandex";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {WordStatuses} from "~/types/words/word";
import {getWords} from "~/redux/action-creaters/word";
import clsx from "clsx";
import {AppDispatch} from "~/redux";
import {
    BsArrowRepeat,
    BsCheck2Circle, BsChevronLeft, BsChevronRight,
    BsEye,
    BsReverseListColumnsReverse,
} from "react-icons/bs";
import Panel from "./panel";
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai";
import {cloneDeep} from "lodash";

enum LearnTypes {
    EnRu = 'En-Ru',
    RuEn = 'Ru-En',
}

export default function LearnComponent() {
    const dispatch: AppDispatch = useDispatch();
    const [currentWordKey, setCurrentWordKey] = useState(0);
    const [isShowTranslation, setIsShowTranslation] = useState(false);
    const [isAllowReset, setIsAllowReset] = useState(false)
    const [currentLikes, setCurrentLikes] = useState({});
    const [resortedItems, setResortedItems] = useState([])

    const {words} = useSelector((state: any) => state.word)

    const learningWords = useMemo(() => {
        return words.filter((word: any) => {
            return [WordStatuses.Learning, WordStatuses.RepeatingMouth, WordStatuses.RepeatingSixMouth, WordStatuses.RepeatingYear].includes(word.status)
        });
    }, [words]);

    const learningWordsSorted = useMemo(() => {
        if (resortedItems.length > 0) {
            return resortedItems;
        } else {
            return learningWords;
        }
    }, [learningWords, resortedItems]);

    const word = useMemo(() => {
        return learningWordsSorted[currentWordKey] || {};
    }, [learningWordsSorted, currentWordKey])

    const [learnType, setLearnType] = useState(LearnTypes.EnRu)

    const setNextWord = () => {
        setIsShowTranslation(false);
        setIsShowSentences(false);
        if (currentWordKey >= (learningWordsSorted.length - 1)) {
            setCurrentWordKey(0)
        } else {
            setCurrentWordKey(currentWordKey + 1)
        }
    }

    const setPrevWord = () => {
        setIsShowTranslation(false);
        setIsShowSentences(false);
        if (currentWordKey === 0) {
            setCurrentWordKey(learningWordsSorted.length - 1)
        } else {
            setCurrentWordKey(currentWordKey - 1)
        }
    }

    const {sentences} = useSelector((state: any) => state.sentence)

    const wordSentences = useMemo(() => {
        return sentences.map((sentence: any) => {
            return sentence;
        }).filter((sentence: any) => {
            return sentence.sentence.includes(word.word);
        });
    }, [sentences, word]);

    const [isShowSentences, setIsShowSentences] = useState(false);

    return (
        <div>
            {learningWordsSorted.length === 0 && (
                <div>No words to learn</div>
            )}
            {learningWordsSorted.length > 0 && (
                <div className={styles.Content}>

                    <div className={styles.LearnWrapper}>
                        <div className={styles.Arrows}>
                            <div className={styles.Left} onClick={() => {
                                setPrevWord();
                            }}>
                                <BsChevronLeft/>
                            </div>
                            <div className={styles.Right} onClick={() => {
                                setNextWord();
                            }}>
                                <BsChevronRight/>
                            </div>

                        </div>
                        <div className={styles.Learn}>

                            <div className={styles.Top}>

                                <div className={styles.TopButtons}>
                                    {wordSentences.length > 0 && (
                                        <div className={styles.TopButton}
                                             onClick={() => setIsShowSentences(!isShowSentences)}>
                                            <BsReverseListColumnsReverse/>
                                            <div><span>{wordSentences.length}</span></div>
                                        </div>
                                    )}
                                    <div className={styles.TopButton} onClick={(e) => {
                                        dispatch(showPopup(popupTypes.addWord, word));
                                    }}>
                                        <EditIcon/>
                                    </div>
                                </div>
                            </div>

                            {isShowSentences && (
                                <div className={styles.Sentences}>
                                    {wordSentences.map((sentence: any) => (
                                        <div className={styles.Sentence} key={sentence.id}>
                                            <div>{sentence.sentence}</div>
                                            {sentence.translation && <span>{sentence.translation}</span>}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {!isShowSentences && (
                                <>
                                    <div
                                        className={clsx(learnType === LearnTypes.RuEn && !isShowTranslation && styles.Blured, styles.Word)}
                                        onClick={() => {
                                            setIsShowTranslation(true)
                                        }}>

                                        {learnType === LearnTypes.RuEn && (!isShowTranslation) ? 'wordninja' : word.word}
                                        {(learnType === LearnTypes.EnRu || (isShowTranslation)) ? (
                                            <div className={styles.Resource}>
                                                <a
                                                    href={`https://translate.google.com/?hl=ru&sl=en&tl=ru&text=${word.word}%0A&op=translate`}
                                                    target="_blank"
                                                    rel="nofollow"
                                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                                >
                                                    <GoogleIcon size={24}/>
                                                </a>
                                                <a
                                                    href={`https://translate.yandex.ru/?utm_source=main_stripe_big&source_lang=en&target_lang=ru&text=${word.word}`}
                                                    target="_blank"
                                                    rel="nofollow"
                                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                                >
                                                    <YandexIcon size={24}/>
                                                </a>
                                            </div>
                                        ) : (
                                            <BsEye/>
                                        )}
                                    </div>

                                    <div className={styles.Line}>
                                        <div className={styles.Two} onClick={() => {
                                            setLearnType(learnType === LearnTypes.EnRu ? LearnTypes.RuEn : LearnTypes.EnRu)
                                        }}>
                                            <BsArrowRepeat/>
                                        </div>
                                    </div>
                                    <div
                                        className={clsx(learnType === LearnTypes.EnRu && !isShowTranslation && styles.Blured, styles.Translation)}
                                        onClick={() => {
                                            setIsShowTranslation(true)
                                        }}>
                                        {learnType === LearnTypes.EnRu && !isShowTranslation ? 'wordninja' : (
                                            <>
                                                <div>{word.translation ? word.translation : (
                                                    <Button size="sm" color="warning" onClick={async () => {
                                                        const translate = await Api.translate.get(word.word, 'en', 'ru')
                                                        if (translate?.translations?.length > 0) {
                                                            await Api.words.update(word.id, {
                                                                translation: translate.translations[0].text,
                                                            });
                                                            await dispatch(getWords());
                                                        }
                                                    }}>Translate</Button>
                                                )}</div>

                                            </>
                                        )}
                                        {(learnType === LearnTypes.RuEn || isShowTranslation) ? (
                                            <div className={styles.Resource}>
                                                <a
                                                    href={`https://translate.google.com/?hl=ru&sl=en&tl=ru&text=${word.translation}%0A&op=translate`}
                                                    target="_blank"
                                                    rel="nofollow"
                                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                                >
                                                    <GoogleIcon size={24}/>
                                                </a>
                                                <a
                                                    href={`https://translate.yandex.ru/?utm_source=main_stripe_big&source_lang=en&target_lang=ru&text=${word.translation}`}
                                                    target="_blank"
                                                    rel="nofollow"
                                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                                >
                                                    <YandexIcon size={24}/>
                                                </a>
                                            </div>
                                        ) : (
                                            <BsEye/>
                                        )}
                                    </div>
                                </>
                            )}

                            <div className={styles.Bottom}>
                                <div className={styles.Dislike} onClick={async () => {
                                    await Api.words.setMinus(word.id)
                                    await dispatch(getWords());
                                    setCurrentLikes({...currentLikes, [word.id]: false})
                                    setNextWord();
                                }}><AiOutlineDislike/>
                                    <div><span>{word.minuses}</span></div>
                                </div>
                                <div onClick={async () => {
                                    await Api.words.update(word.id, {
                                        status: (+word.status + 1),
                                    });
                                    setIsShowTranslation(false);
                                    setIsShowSentences(false);
                                    await dispatch(getWords());
                                }}>
                                    <BsCheck2Circle/>
                                </div>
                                <div className={styles.Like} onClick={async () => {
                                    await Api.words.setPlus(word.id);
                                    await dispatch(getWords());
                                    setCurrentLikes({...currentLikes, [word.id]: true})
                                    setNextWord();
                                }}><AiOutlineLike/>
                                    <div><span>{word.pluses}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Panel
                        currentLikes={currentLikes}
                        currentWordKey={currentWordKey}
                        learningWords={learningWordsSorted}
                        isAllowReset={isAllowReset}
                        onResetSort={() => {
                            const words = cloneDeep(learningWords);
                            for (let i = words.length - 1; i > 0; i--) {
                                const j = Math.floor(Math.random() * (i + 1));
                                const temp = words[i];
                                words[i] = words[j];
                                words[j] = temp;
                            }
                            setResortedItems(words)
                        }}
                        onResetLikes={() => {
                            setCurrentLikes({})
                        }}
                        onStartOver={() => {
                            setCurrentLikes({})
                        }}
                        onChangeIndex={(index: number) => {
                            setCurrentWordKey(index)
                        }}
                    />
                </div>
            )}

        </div>
    )
}
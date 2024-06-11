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
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import {
    BsArrowRepeat,
    BsCheck2Circle,
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
    const sliderRef: any = useRef();
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
            // @ts-ignore
            sliderRef.current.swiper.slideTo(0);
        } else {
            setCurrentWordKey(currentWordKey + 1)
            // @ts-ignore
            sliderRef.current.swiper.slideTo(currentWordKey + 1);
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
                <div className={styles.Slides}>

                    <div>
                        <Swiper
                            ref={sliderRef}
                            speed={100}
                            watchSlidesProgress
                            slidesPerView={'auto'}
                            centeredSlides={true}
                            spaceBetween={20}
                            onActiveIndexChange={(swiper) => {
                                setCurrentWordKey(swiper.activeIndex)
                                setIsShowTranslation(false);
                                setIsShowSentences(false);
                            }}
                            className={styles.Swiper}
                            modules={[Navigation]}
                            navigation={true}
                        >
                            {learningWordsSorted.map((word: any, wordKey: number) => (
                                <SwiperSlide key={word.id} className={clsx(currentWordKey === wordKey && styles.SwiperSlideActive, styles.SwiperSlide)} onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                    <div className={styles.Learn}>
                                        <div className={styles.Top}>
                                            <div className={styles.TopButtons}>
                                                {wordSentences.length > 0 && (
                                                    <div className={styles.TopButton} onClick={() => setIsShowSentences(!isShowSentences)}>
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

                                        {isShowSentences && currentWordKey === wordKey && (
                                            <div className={styles.Sentences}>
                                                {wordSentences.map((sentence: any) => (
                                                    <div className={styles.Sentence} key={sentence.id}>
                                                        <div>{sentence.sentence}</div>
                                                        {sentence.translation && <span>{sentence.translation}</span>}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {(!isShowSentences || currentWordKey !== wordKey) && (
                                            <>
                                                <div
                                                    className={clsx(learnType === LearnTypes.RuEn && (!isShowTranslation || currentWordKey !== wordKey) && styles.Blured, styles.Word)}
                                                    onClick={() => {
                                                        setIsShowTranslation(true)
                                                    }}>

                                                    {learnType === LearnTypes.RuEn && (!isShowTranslation || currentWordKey !== wordKey) ? 'wordninja' : word.word}
                                                    {(learnType === LearnTypes.EnRu || (isShowTranslation && currentWordKey === wordKey)) ? (
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
                                                    className={clsx(learnType === LearnTypes.EnRu && (!isShowTranslation || currentWordKey !== wordKey) && styles.Blured, styles.Translation)}
                                                    onClick={() => {
                                                        setIsShowTranslation(true)
                                                    }}>
                                                    {learnType === LearnTypes.EnRu && (!isShowTranslation || currentWordKey !== wordKey) ? 'wordninja' : (
                                                        <>
                                                            <div>{ word.translation ? word.translation : (
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
                                                    {(learnType === LearnTypes.RuEn || (isShowTranslation && currentWordKey === wordKey)) ? (
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
                                                setCurrentLikes({ ...currentLikes, [word.id]: false})
                                                setNextWord();
                                            }}><AiOutlineDislike /><div><span>{word.minuses}</span></div></div>
                                            <div onClick={async () => {
                                                await Api.words.update(word.id, {
                                                    status: (+word.status + 1),
                                                });
                                                await dispatch(getWords());
                                            }}>
                                                <BsCheck2Circle/>
                                            </div>
                                            <div className={styles.Like} onClick={async () => {
                                                await Api.words.setPlus(word.id);
                                                await dispatch(getWords());
                                                setCurrentLikes({ ...currentLikes, [word.id]: true})
                                                setNextWord();
                                            }}><AiOutlineLike /><div><span>{word.pluses}</span></div></div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
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
                            // @ts-ignore
                            sliderRef.current.swiper.slideTo(0);
                        }}
                        onResetLikes={() => {
                            setCurrentLikes({})
                        }}
                        onStartOver={() => {
                            setCurrentLikes({})
                            // @ts-ignore
                            sliderRef.current.swiper.slideTo(0);
                        }}
                        onChangeIndex={(index: number) => {
                            // @ts-ignore
                            sliderRef.current.swiper.slideTo(index);
                        }}
                    />
                </div>
            )}

        </div>
    )
}
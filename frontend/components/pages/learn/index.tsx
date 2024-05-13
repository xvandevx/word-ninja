import styles from "./index.module.scss";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip} from "@nextui-org/react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {Api} from "~/api";
import {setLearnedWords, setLearningWords} from "~/redux/action-creaters/learn";
import {ChevronDownIcon, DeleteIcon, EditIcon} from "@nextui-org/shared-icons";
import {WordStatusNames} from "~/types/words/wordFe";
import {CSSTransition} from 'react-transition-group';
import {showPopup} from "~/redux/action-creaters/popup";
import {DeleteUser} from "~/components/common/detele";
import {GoogleIcon} from "~/components/icons/google";
import {YandexIcon} from "~/components/icons/yandex";
import {popupTypes} from "~/redux/reducers/popupReducer";
export default function LearnComponent() {
    const dispatch = useDispatch();
    const {learningWordIds, learnedWordIds} = useSelector((state: any) => state.learn)
    const [word, setWord]: any = useState({});
    const [currentWordKey, setCurrentWordKey] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowTranslation, setIsShowTranslation] = useState(false);
    const [learnType, setLearnType] = useState(true);

    const currentLearningWordId = useMemo(() => {
        return +learningWordIds[currentWordKey];
    }, [learningWordIds, currentWordKey])

    const getWord = async () => {
        setIsLoading(true);
        const word = await Api.words.getById(currentLearningWordId)
        setWord(word[0])
        setIsLoading(false);
    }

    useEffect(() => {
        if (currentLearningWordId && !isLoading && currentLearningWordId !== +word.id) {
            getWord();
        }
    }, [currentLearningWordId, word])

    const setNextWord = () => {
        setIsShowTranslation(false);
        if (currentWordKey === (learningWordIds.length - 1)) {
            setCurrentWordKey(0)
        } else {
            setCurrentWordKey(currentWordKey + 1)
        }
    }

    const {visibleType} = useSelector((state: any) => state.popup)

    useEffect(() => {
        if (currentLearningWordId && visibleType === popupTypes.none) {
            getWord();
        }
    }, [visibleType, currentLearningWordId]);

    return (
        <div>
            {learningWordIds.length === 0 && (
                <div>No words to learn</div>
            )}
            {learningWordIds.length > 0 && (
                <>
                    <div className='flex justify-between'>
                        <div className={styles.Counter}>
                            Num: {currentWordKey + 1}
                        </div>

                        <Dropdown>
                            <DropdownTrigger className="flex">
                                <Button
                                    endContent={<ChevronDownIcon className="text-small" />}
                                    variant="flat"
                                >
                                    {
                                        // @ts-ignore
                                        !WordStatusNames[word.status] ? `Status` : WordStatusNames[word.status]
                                    }
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={new Set([word.status])}
                                onSelectionChange={async (status) => {
                                    await Api.words.update(word.id, {
                                        // @ts-ignore
                                        status: {...status}.currentKey
                                    });
                                    await getWord();
                                }}
                            >
                                {Object.keys(WordStatusNames).map((status: string) => (
                                    <DropdownItem key={status} className="capitalize">
                                        {
                                            // @ts-ignore
                                            WordStatusNames[status]
                                        }
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>


                    <div className={styles.Learn}>
                        <CSSTransition
                            in={word.word}
                            timeout={500}
                            classNames="fade-up"
                            unmountOnExit
                        >
                            <div className={styles.Word}>
                                {learnType ? word.word : word.translation}

                                <a
                                    href={`https://translate.google.com/?hl=ru&sl=en&tl=ru&text=${learnType ? word.word : word.translation}%0A&op=translate`}
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
                        </CSSTransition>

                        {isShowTranslation && (
                            <div className={styles.Translation}>
                                {learnType ? word.translation : word.word}
                                <a
                                    href={`https://translate.google.com/?hl=ru&sl=en&tl=ru&text=${learnType ? word.translation : word.word}%0A&op=translate`}
                                    target="_blank"
                                    rel="nofollow"
                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                >
                                    <GoogleIcon size={24}/>
                                </a>
                                <a
                                    href={`https://translate.yandex.ru/?utm_source=main_stripe_big&source_lang=en&target_lang=ru&text=${learnType ? word.translation : word.word}`}
                                    target="_blank"
                                    rel="nofollow"
                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                >
                                    <YandexIcon size={24}/>
                                </a>
                            </div>)}
                        {((learnType && word.translation) || (!learnType && word.word)) && !isShowTranslation && <Button onClick={() => {
                            setIsShowTranslation(true)
                        }}>Show translation</Button>}

                        <div>
                            <div className='flex gap-2 justify-center'>

                            </div>
                            <div className='flex justify-center mt-3  gap-2 '>

                                <Button disableAnimation={true} className={styles.Button} onClick={(e) => {
                                    // @ts-ignore
                                    dispatch(showPopup(popupTypes.addWord, word));
                                }}>
                                         <span className="text-lg text-default-400 cursor-pointer " >
                                            <EditIcon />
                                        </span>
                                </Button>

                                <Button disableAnimation={true} className={styles.Button} onClick={(e) => {
                                    setLearnType(!learnType)
                                }}>
                                       Change learn type
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.PanelWrapper}>
                        <div className={styles.Panel}>
                            <Button color="success" onClick={() => {
                                Api.words.setPlus(word.id)
                                setNextWord();
                            }}>Plus ({word.pluses})</Button>
                            <Button color="danger" onClick={() => {
                                Api.words.setMinus(word.id)
                                setNextWord();
                            }}>Minus ({word.minuses})</Button>
                            <Button onClick={() => {
                                setNextWord();
                            }}>Skip</Button>
                            <Button color="secondary" onClick={() => {
                                // @ts-ignore
                                dispatch(setLearningWords(learningWordIds.filter(wordId => wordId != currentLearningWordId)));
                                // @ts-ignore
                                dispatch(setLearnedWords([...learnedWordIds, currentLearningWordId]));
                                setNextWord();
                            }}>Learned ({learnedWordIds.length})</Button>
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}
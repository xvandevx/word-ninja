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
            getWord(currentLearningWordId);
        }
    }, [currentLearningWordId, word])

    const setNextWord = () => {
        if (currentWordKey === (learningWordIds.length - 1)) {
            setCurrentWordKey(0)
        } else {
            setCurrentWordKey(currentWordKey + 1)
        }
        setIsShowTranslation(false);
    }

    const [statusFilter, setStatusFilter] = useState([]);

    const statusFilterArray = useMemo(() => {
        return [...statusFilter].map(item => +item);
    }, [statusFilter])

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
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={<ChevronDownIcon className="text-small" />}
                                    variant="flat"
                                >
                                    {!WordStatusNames[word.status] ? `Status` : WordStatusNames[word.status]}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Table Columns"
                                selectedKeys={new Set([word.status])}
                                closeOnSelect={false}
                                selectionMode="multiple"
                                onSelectionChange={async (status) => {
                                    await Api.words.update(word.id, {
                                        status: {...status}.currentKey
                                    });
                                    await getWord();
                                }}
                            >
                                {Object.keys(WordStatusNames).map((status) => (
                                    <DropdownItem key={status} className="capitalize">
                                        {WordStatusNames[status]}
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
                            <div className={styles.Word}>{word.word}</div>
                        </CSSTransition>

                        <CSSTransition
                            in={isShowTranslation}
                            timeout={500}
                            classNames="fade-up"
                            unmountOnExit
                        >
                            <div className={styles.Translation}>{word.translation}</div>
                        </CSSTransition>
                        {!isShowTranslation && <Button onClick={() => {
                            setIsShowTranslation(true)
                        }}>Show translation</Button>}

                        <div>
                            <div className='flex justify-end'>

                                <Button variant="light" disableAnimation={true} size="sm" className={styles.Button}>
                                    <a
                                        href={`https://translate.google.com/?hl=ru&sl=en&tl=ru&text=${word.word}%0A&op=translate`}
                                        target="_blank"
                                        rel="nofollow"
                                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                    >
                                        <GoogleIcon />
                                    </a>
                                </Button>
                                <Button variant="light" disableAnimation={true} size="sm" className={styles.Button}>
                                    <a
                                        href={`https://translate.yandex.ru/?utm_source=main_stripe_big&source_lang=en&target_lang=ru&text=${word.word}`}
                                        target="_blank"
                                        rel="nofollow"
                                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                    >
                                        <YandexIcon />
                                    </a>
                                </Button>
                            </div>
                            <div className='flex justify-center mt-3'>

                                <Button disableAnimation={true} className={styles.Button} onClick={(e) => {
                                    dispatch(showPopup(popupTypes.addWord, word));
                                }}>
                                         <span className="text-lg text-default-400 cursor-pointer active:opacity-50" >
                                            <EditIcon />
                                        </span>
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
                                dispatch(setLearningWords(learningWordIds.filter(wordId => wordId != currentLearningWordId)));
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
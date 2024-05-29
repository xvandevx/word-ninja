import styles from "./index.module.scss";
import {
    Button, Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Select,
    SelectItem,
    Tooltip
} from "@nextui-org/react";
import {useDispatch, useSelector} from "react-redux";
import {useMemo, useState} from "react";
import {Api} from "~/api";
import {ChevronDownIcon, DeleteIcon, EditIcon} from "@nextui-org/shared-icons";
import {WordStatusNames} from "~/types/words/wordFe";
import {showPopup} from "~/redux/action-creaters/popup";
import {GoogleIcon} from "~/components/icons/google";
import {YandexIcon} from "~/components/icons/yandex";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {WordStatuses} from "~/types/words/word";
import {getWords} from "~/redux/action-creaters/word";
import clsx from "clsx";
import {EyeIcon} from "~/components/icons/eye";
import {AppDispatch} from "~/redux";

enum SortTypes {
    Asc = 'Asc',
    Desc = 'Desc',
    Random = 'Random',
}
const Sorts = [SortTypes.Random, SortTypes.Asc, SortTypes.Desc];

enum LearnTypes {
    EnRu = 'En-Ru',
    RuEn = 'Ru-En',
}
const Learns = [LearnTypes.EnRu, LearnTypes.RuEn];

export default function LearnComponent() {
    const dispatch: AppDispatch = useDispatch();
    const [currentWordKey, setCurrentWordKey] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowTranslation, setIsShowTranslation] = useState(false);

    const {words} = useSelector((state: any) => state.word)

    const learningWords = useMemo(() => {
        return words.filter((word: any) => {
            return [WordStatuses.Learning, WordStatuses.RepeatingMonth, WordStatuses.RepeatingSixMonth, WordStatuses.RepeatingYear].includes(word.status)
        });
    }, [words]);

    const word = useMemo(() => {
        return learningWords[currentWordKey] || {};
    }, [learningWords, currentWordKey])

    const [learnType, setLearnType] = useState(LearnTypes.EnRu)

    const [sort, setSort] = useState(SortTypes.Random)

    const setNextWord = () => {
        setIsShowTranslation(false);
        if (sort === SortTypes.Random) {
            setCurrentWordKey(Math.floor(Math.random() * (learningWords.length + 1)))
        } else if (sort === SortTypes.Asc) {
            if (currentWordKey >= (learningWords.length - 1)) {
                setCurrentWordKey(0)
            } else {
                setCurrentWordKey(currentWordKey + 1)
            }
        } else if (sort === SortTypes.Desc) {
            if (currentWordKey === 0) {
                setCurrentWordKey(learningWords.length - 1)
            } else {
                setCurrentWordKey(currentWordKey - 1)
            }
        }
    }

    const {sentences} = useSelector((state: any) => state.sentence)

    const wordSentences = useMemo(() => {
        return sentences.map((sentence: any) => {
            return sentence.sentence;
        }).filter((sentence: any) => {
            return sentence.includes(word.word);
        });
    }, [sentences, word])

    return (
        <div>
            {learningWords.length === 0 && (
                <div>No words to learn</div>
            )}
            {learningWords.length > 0 && (
                <>
                    <div className='flex justify-between'>
                        <div className={styles.Counter}>
                            Num: {currentWordKey + 1}
                        </div>

                        <div className='flex gap-5'>
                            <Select
                                label="Learn Type"
                                size="sm"
                                className={styles.Selector}
                                selectedKeys={new Set([learnType])}
                                onSelectionChange={(learn) => {
                                    // @ts-ignore
                                    setLearnType({...learn}.currentKey)
                                }}
                            >
                                {Learns.map((learn) => (
                                    <SelectItem key={learn} value={learn}>
                                        {learn}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select
                                label="Sorting"
                                size="sm"
                                className={styles.Selector}
                                selectedKeys={new Set([sort])}
                                onSelectionChange={(sort) => {
                                    // @ts-ignore
                                    setSort({...sort}.currentKey)
                                }}
                            >
                                {Sorts.map((sort) => (
                                    <SelectItem key={sort} value={sort}>
                                        {sort}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>


                    <div className={styles.Learn}>
                        <div
                            className={clsx(learnType === LearnTypes.RuEn && !isShowTranslation && styles.Blured, styles.Word)}
                            onClick={() => {
                                setIsShowTranslation(true)
                            }}>
                            {learnType === LearnTypes.RuEn && !isShowTranslation ? 'wordninja' : word.word}
                            {(learnType === LearnTypes.EnRu || isShowTranslation) ? (
                                <>
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
                                </>
                            ) : (
                                <EyeIcon/>
                            )}
                        </div>

                        {wordSentences.length > 0 && <div className={styles.Categoryes}>{wordSentences.map((sentence: string) => (
                            <Chip key={sentence} className="capitalize"  size="sm" variant="flat">
                                {sentence}
                            </Chip>
                        ))}</div>}

                        {word.translation && (
                            <div
                                className={clsx(learnType === LearnTypes.EnRu && !isShowTranslation && styles.Blured, styles.Translation)}
                                onClick={() => {
                                    setIsShowTranslation(true)
                                }}>
                                {learnType === LearnTypes.EnRu && !isShowTranslation ? 'wordninja' : word.translation}
                                {(learnType === LearnTypes.RuEn || isShowTranslation) ? (
                                    <>
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
                                    </>
                                ) : (
                                    <EyeIcon/>
                                )}
                            </div>
                        )}

                        <div>
                            <div className='flex gap-2 justify-center'>

                                <Dropdown>
                                    <DropdownTrigger className="flex">
                                        <Button
                                            endContent={<ChevronDownIcon className="text-small"/>}
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
                                            await dispatch(getWords());
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
                            <div className='flex justify-center mt-3  gap-2 '>

                                <Button disableAnimation={true} className={styles.Button} onClick={(e) => {
                                    // @ts-ignore
                                    dispatch(showPopup(popupTypes.addWord, word));
                                }}>
                                         <span className="text-lg text-default-400 cursor-pointer ">
                                            <EditIcon/>
                                        </span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.PanelWrapper}>
                        <div className={styles.Panel}>
                            <Button color="success" onClick={async () => {
                                await Api.words.setPlus(word.id);
                                await dispatch(getWords());
                                setNextWord();
                            }}>Plus ({word.pluses})</Button>
                            <Button color="danger" onClick={async () => {
                                await Api.words.setMinus(word.id)
                                await dispatch(getWords());
                                setNextWord();
                            }}>Minus ({word.minuses})</Button>
                            <Button onClick={() => {
                                setNextWord();
                            }}>Skip</Button>
                            <Button color="secondary" onClick={async () => {
                                await Api.words.update(word.id, {
                                    status: (+word.status + 1),
                                });
                                await dispatch(getWords());
                                setNextWord();
                            }}>Learned</Button>
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}
import PopupFormWrapper from "~/components/popups/popupFormWrapper";
import {Button, Input, Select, SelectItem, Textarea} from "@nextui-org/react";
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Api} from "~/api";
import {showPopup} from "~/redux/action-creaters/popup";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {getWords} from "~/redux/action-creaters/word";
import {WordStatuses} from "~/types/words/word";
import {WordStatusNames} from "~/types/words/wordFe";
import styles from "./index.module.scss";
import {GoogleIcon} from "~/components/icons/google";
import {YandexIcon} from "~/components/icons/yandex";

export default function AddWord({onHide}: any) {
    const [result, setResult]: any = useState({status: `${WordStatuses.NewWord}`});
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {data} = useSelector((state: any) => state.popup)
    const {words} = useSelector((state: any) => state.word)

    const {wordCategorys} = useSelector((state: any) => state.category)

    const submit = async (closePopup = true) => {
        setError('');

        const existingWord = words.find((word: any) => word.word === result.word);

        if (existingWord) {
            if (data.id) {
                if (data.id !== existingWord.id) {
                    setError('Word already exist');
                    return
                }
            } else {
                setError('Word already exist');
                return
            }
        }
        setLoading(true)
        try {
            if (data.id) {
                await Api.words.update(data.id, {
                    ...result,
                    word: result.word?.toLowerCase().trim(),
                    translation: result.translation?.toLowerCase().trim(),
                });
            } else {
                await Api.words.add({
                    ...result,
                    word: result.word?.toLowerCase().trim(),
                    translation: result.translation?.toLowerCase().trim(),
                });
            }
            // @ts-ignore
            await dispatch(getWords());

            if (closePopup) {
                // @ts-ignore
                await dispatch(showPopup(popupTypes.none))
            }
        } catch (e: any) {
            if (e.message.includes("401")) {
                setError('Error');
            } else {
                setError(e.message);
            }
        }
        setResult({status: `${WordStatuses.NewWord}`, word: '', translation: ''});
        setLoading(false)
    }

    useEffect(() => {
        if (data.word) {
            setResult((result: any) => ({...result, 'word': data.word}));
        }
        if (data.status) {
            setResult((result: any) => ({...result, 'status': `${data.status}`}));
        }
        if (data.comment) {
            setResult((result: any) => ({...result, 'comment': data.comment}));
        }
        if (data.translation) {
            setResult((result: any) => ({...result, 'translation': data.translation}));
        }
        if (data.categorys) {
            setResult((result: any) => ({...result, 'categorys': data.categorys.map((item: any) => `${item.id}`)}));
        }
    }, [data]);

    const [translations, setTranslation] = useState([]);

    useEffect(() => {
        if (result.word?.length > 3) {
            const translations = Api.words.getTranslation(result.word);
            setTranslation(translations);
        } else {
            setTranslation([]);
        }
    }, [result]);

    return (
        <PopupFormWrapper
            title={`${data?.id ? "Update" : "Add"} word`}
            isLoading={isLoading}
            onSubmit={submit}
            errorText={error}
            additionalButton={!data?.id &&
                <Button onClick={() => {
                    submit(false);
                }} isLoading={isLoading} isDisabled={isLoading}>Add +1</Button>
            }
        >
            <>
                <Input
                    label="Word"
                    value={result.word}
                    onValueChange={async (value: any) => {
                        setResult({...result, 'word': value})
                    }}
                    endContent={
                        <div className='flex gap-2'>
                            <a
                                href={`https://translate.google.com/?hl=ru&sl=en&tl=ru&text=${result.word}%0A&op=translate`}
                                target="_blank"
                                rel="nofollow"
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <GoogleIcon />
                            </a>
                            <a
                                href={`https://translate.yandex.ru/?utm_source=main_stripe_big&source_lang=en&target_lang=ru&text=${result.word}`}
                                target="_blank"
                                rel="nofollow"
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <YandexIcon />
                            </a>
                        </div>
                    }
                />
                <Input
                    label="Translation"
                    value={result.translation}
                    onValueChange={(value: any) => setResult({...result, 'translation': value})}
                    endContent={
                        <div className='flex gap-2 items-center content-center justify-items-center'>
                            {result.word?.length > 2 && (
                                <Button size="sm" color="warning" onClick={async () => {
                                    const translate = await Api.translate.get(result.word, 'en', 'ru')
                                    if (translate?.translations?.length > 0) {
                                        setResult({...result, 'translation': translate.translations[0].text})
                                    }
                                }}>Translate</Button>
                            )}
                            <a
                                href={`https://translate.google.com/?hl=ru&sl=en&tl=ru&text=${result.translation}%0A&op=translate`}
                                target="_blank"
                                rel="nofollow"
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <GoogleIcon/>
                            </a>
                            <a
                                href={`https://translate.yandex.ru/?utm_source=main_stripe_big&source_lang=en&target_lang=ru&text=${result.translation}`}
                                target="_blank"
                                rel="nofollow"
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <YandexIcon/>
                            </a>
                        </div>
                    }
                />
                {translations.length > 0 && <div className={styles.Translations}>
                    {Array.isArray(translations) && translations.map((word: any) => (
                        <Button size='sm' key={word.id} onClick={() => {
                            setResult({...result, 'word': word.en, 'translation': word.ru})
                        }}>{word.ru}</Button>
                    ))}
                </div>}

                <Select
                    label="Categorys"
                    selectedKeys={result.categorys}
                    selectionMode="multiple"
                    onSelectionChange={(value: any) => setResult({...result, 'categorys': [...value]})}
                >
                    {wordCategorys.map((item: any) => (
                        <SelectItem key={item.id} value={item.id}>
                            {item.name}
                        </SelectItem>
                    ))}
                </Select>
                <Textarea
                    label="Comment"
                    value={result.comment}
                    onValueChange={(value: any) => setResult({...result, 'comment': value})}
                />
                <Select
                    label="Status"
                    selectedKeys={result.status}
                    onSelectionChange={(value: any) => setResult({...result, 'status': [...value]})}
                >
                    {Object.keys(WordStatusNames).map((status) => (
                        <SelectItem key={status} value={status}>
                            {//@ts-ignore
                                WordStatusNames[status]
                            }
                        </SelectItem>
                    ))}
                </Select>
            </>
        </PopupFormWrapper>
    )
}

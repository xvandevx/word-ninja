import styles from './index.module.scss'
import PopupFormWrapper from "~/components/popups/popupFormWrapper";
import {Input, Select, SelectItem, Textarea} from "@nextui-org/react";
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Api} from "~/api";
import Cookies from 'js-cookie'
import {getWordCategory} from "~/redux/action-creaters/category";
import {showPopup} from "~/redux/action-creaters/popup";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {getWords} from "~/redux/action-creaters/word";
import {WordStatuses} from "~/types/words/word";
import {WordStatusNames} from "~/types/words/wordFe";
import {AppDispatch} from "~/redux";


export default function AddWords({onHide}: any) {
    const [result, setResult]: any = useState({status: `${WordStatuses.NewWord}`});
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const {words} = useSelector((state: any) => state.word)

    const {wordCategorys} = useSelector((state: any) => state.category)

    const submit = async () => {
        setError('');
        setLoading(true)

        const addedWords = words.map((word: any) => word.word);

        try {
            const words = result.words?.split(',');
            for (const word of words) {
                const wordPrepeared = word.toLowerCase().trim();
                if (!addedWords.includes(wordPrepeared)) {
                    addedWords.push(wordPrepeared)
                    await Api.words.add({
                        word: wordPrepeared,
                        status: result.status,
                        categorys: result.categorys,
                    });
                }
            }

            await dispatch(getWords());
            await dispatch(showPopup(popupTypes.none))
        } catch (e: any) {
            if (e.message.includes("401")) {
                setError('Error');
            } else {
                setError(e.message);
            }
        }

        setLoading(false)
    }

    return (
        <PopupFormWrapper
            title={`Add multiple words`}
            isLoading={isLoading}
            onSubmit={submit}
            errorText={error}
            popupType={popupTypes.addWords}
        >
            <>
                <Textarea
                    label="Words separated by commas"
                    value={result.comment}
                    onValueChange={(value: any) => setResult({...result, 'words': value})}
                />
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
                <Select
                    label="Status"
                    selectedKeys={result.status}
                    onSelectionChange={(value: any) => setResult({...result, 'status': [...value]})}
                >
                    {Object.keys(WordStatusNames).map((status) => (
                        <SelectItem key={status} value={status}>
                            {
                                //@ts-ignore
                                WordStatusNames[status]
                            }
                        </SelectItem>
                    ))}
                </Select>
            </>
        </PopupFormWrapper>
    )
}

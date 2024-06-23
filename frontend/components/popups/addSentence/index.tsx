import PopupFormWrapper from "~/components/popups/popupFormWrapper";
import {Input, Select, SelectItem, Textarea} from "@nextui-org/react";
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Api} from "~/api";
import {showPopup} from "~/redux/action-creaters/popup";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {getWords} from "~/redux/action-creaters/word";
import {WordStatuses} from "~/types/words/word";
import {WordStatusNames} from "~/types/words/wordFe";
import {getSentences} from "~/redux/action-creaters/sentense";
import {AppDispatch} from "~/redux";
import AddTabs from "~/components/popups/tabs";

export default function AddSentence({onHide}: any) {
    const [result, setResult]: any = useState({status: `${WordStatuses.NewWord}`});
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const {data} = useSelector((state: any) => state.popup)


    const {sentenceCategorys} = useSelector((state: any) => state.category)

    const submit = async () => {
        setError('');
        setLoading(true)
        try {
            if (data.id) {
                await Api.sentences.update(data.id, result);
            } else {
                await Api.sentences.add(result);
            }
            await dispatch(getSentences());
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

    useEffect(() => {
        if (data.sentence) {
            setResult((result: any) => ({...result, 'sentence': data.sentence}));
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

    return (
        <PopupFormWrapper
            title={`${data?.id ? "Update" : "Add"} sentence`}
            isLoading={isLoading}
            onSubmit={submit}
            errorText={error}
            popupType={popupTypes.addSentence}
        >
            <>
                <Textarea
                    label="Sentence"
                    value={result.sentence}
                    onValueChange={(value: any) => setResult({...result, 'sentence': value})}
                />
                <Textarea
                    label="Translation"
                    value={result.translation}
                    onValueChange={(value: any) => setResult({...result, 'translation': value})}
                />

                <Select
                    label="Categorys"
                    selectedKeys={result.categorys}
                    selectionMode="multiple"
                    onSelectionChange={(value: any) => setResult({...result, 'categorys': [...value]})}
                >
                    {sentenceCategorys.map((item: any) => (
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
            </>
        </PopupFormWrapper>
    )
}

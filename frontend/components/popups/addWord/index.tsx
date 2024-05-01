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

export default function AddWord({onHide}: any) {
    const [result, setResult]: any = useState({status: `${WordStatuses.NewWord}`});
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {data} = useSelector((state: any) => state.popup)


    const {wordCategorys} = useSelector((state: any) => state.category)

    const submit = async () => {
        setError('');
        setLoading(true)
        try {
            if (data.id) {
                await Api.words.update(data.id, result);
            } else {
                await Api.words.add(result);
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
            setResult((result: any) => ({...result, 'categorys': data.categorys.map(item => `${item.id}`)}));
        }
    }, [data]);

    return (
        <PopupFormWrapper
            title={`${data?.id ? "Update" : "Add"} word`}
            isLoading={isLoading}
            onSubmit={submit}
            errorText={error}
        >
            <>
                <Input
                    label="Word"
                    value={result.word}
                    onValueChange={(value: any) => setResult({...result, 'word': value})}
                />
                <Input
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
                    {wordCategorys.map((item) => (
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
                            {WordStatusNames[status]}
                        </SelectItem>
                    ))}
                </Select>
            </>
        </PopupFormWrapper>
    )
}

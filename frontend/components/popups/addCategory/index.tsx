import styles from './index.module.scss'
import PopupFormWrapper from "~/components/popups/popupFormWrapper";
import {Input, Select, SelectItem} from "@nextui-org/react";
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Api} from "~/api";
import Cookies from 'js-cookie'
import {getWordCategory} from "~/redux/action-creaters/category";
import {showPopup} from "~/redux/action-creaters/popup";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {CategoryTypesList} from "~/types";

export default function AddCategory({onHide}: any) {
    const [result, setResult]: any = useState({type: '1'});
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {data} = useSelector((state: any) => state.popup)

    const submit = async () => {
        setError('');
        setLoading(true)

        try {
            if (data.id) {
                await Api.categorys.update(data.id, result);
            } else {
                await Api.categorys.add(result);
            }

            dispatch(getWordCategory());
            dispatch(showPopup(popupTypes.none))
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
        if (data.name) {
            setResult((result: any) => ({...result, 'name': data.name}));
        }
        if (data.type) {
            setResult((result: any) => ({...result, 'type': [`${data.type}`]}));
        }
    }, [data]);

    return (
        <PopupFormWrapper
            title={`${data?.id ? "Update" : "Add"} ${data.type ? 'word' : 'sentence'} category`}
            isLoading={isLoading}
            onSubmit={submit}
            errorText={error}
        >
            <Input
                label="Name"
                value={result.name}
                onValueChange={(value: any) => setResult({...result, 'name': value})}
            />
            <Select
                label="Type"
                selectedKeys={result.type}
                onSelectionChange={(value: any) => setResult({...result, 'type': [...value]})}
            >
                {CategoryTypesList.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                        {item.name}
                    </SelectItem>
                ))}
            </Select>
        </PopupFormWrapper>
    )
}

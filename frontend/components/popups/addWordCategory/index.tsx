import styles from './index.module.scss'
import PopupFormWrapper from "~/components/popups/popupFormWrapper";
import Input from "~/components/common/input";
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Api} from "~/api";
import Cookies from 'js-cookie'
import {getWordCategory} from "~/redux/action-creaters/category";
import {showPopup} from "~/redux/action-creaters/popup";
import {popupTypes} from "~/redux/reducers/popupReducer";

const fields = [
    {
        name: 'Category',
        code: 'name',
        required: true,
    },
];

export default function AddWordCategory({onHide}: any) {
    const [result, setResult]: any = useState({isActive: true});
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const dispatch = useDispatch();

    const submit = async () => {
        setError('');

        try {
            await Api.categorys.addWordCategory(result);
            dispatch(getWordCategory());
            dispatch(showPopup(popupTypes.none))
        } catch (e: any) {
            if (e.message.includes("401")) {
                setError('Error');
            } else {
                setError(e.message);
            }
        }

        setIsProcessing(false)
    }

    return (
        <PopupFormWrapper
            title='Add word category'
            isLoading={isLoading}
            isProcessing={isProcessing}
            onSubmit={submit}
            errorText={error}
        >
            {fields.map(({name, code, required}: any) => (
                <Input
                    key={name}
                    label={name}
                    required={required}
                    onChange={(value: any) => setResult({...result, [code]: value})}
                />
            ))}
        </PopupFormWrapper>
    )
}

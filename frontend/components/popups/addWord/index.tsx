import styles from './index.module.scss'
import PopupFormWrapper from "~/components/popups/popupFormWrapper";
import Input from "~/components/common/input";
import {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {Api} from "~/api";
import Cookies from 'js-cookie'

const newWordFields = [
    {
        name: 'Word',
        code: 'word',
        required: true,
    },
    {
        name: 'Translation',
        code: 'translation',
    }
];

export default function AddWord({onHide}: any) {
    const [result, setResult]: any = useState({});
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [resetPasswordEmail, setResertPasswordEmail] = useState('');
    const title = useMemo(() => {
        if (resetPasswordEmail) {
            return 'Set password';
        }
        return 'Login'
    }, [resetPasswordEmail])
    const submit = async () => {
        setError('');

        if (resetPasswordEmail) {
            if (result.password !== result.passwordRepeat) {
                setError('Passwords does not match');
                return;
            }
            try {
                await Api.auth.setPassword({
                    email: resetPasswordEmail,
                    password: result.password
                });
                setResertPasswordEmail('');
            } catch (e: any) {
                if (e.message.includes("401")) {
                    setError('Error');
                } else {
                    setError(e.message);
                }
            }
        } else {
            try {
                setIsProcessing(true)
                const data = await Api.auth.login(result);
                if (data.status === 'setPassword') {
                    setResertPasswordEmail(result.email)
                } else if (data.status === 'success') {
                    Cookies.set('token', data.token, {
                        path: '/',
                    });
                    window.location.href = '/';
                } else {
                    setError('Auth failed!');
                }
            } catch (e: any) {
                if (e.message.includes("401")) {
                    setError('Wrong user name or password');
                } else {
                    setError(e.message);
                }
            }
        }
        setIsProcessing(false)
    }

    return (
        <PopupFormWrapper
            title='Add new word'
            isLoading={isLoading}
            isProcessing={isProcessing}
            onSubmit={submit}
            errorText={error}
        >
            {newWordFields.map(({name, code, required}: any) => (
                <Input
                    key={name}
                    label={name}
                    required={required}
                    onChange={(value: any) => setResult({...result, [code]: value})}
                />
            ))}
            categorys
        </PopupFormWrapper>
    )
}

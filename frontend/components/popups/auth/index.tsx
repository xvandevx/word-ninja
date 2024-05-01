import styles from './index.module.scss'
import PopupFormWrapper from "~/components/popups/popupFormWrapper";
import {Input} from "@nextui-org/react";
import {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {Api} from "~/api";
import Cookies from 'js-cookie'
import {EyeFilledIcon, EyeSlashFilledIcon} from "@nextui-org/shared-icons";

const authFields = [
    {
        name: 'Email',
        code: 'email',
        required: true,
    },
    {
        name: 'Password',
        code: 'password',
        required: true,
    }
];

const resetPasswordFields = [
    {
        name: 'Password',
        code: 'password',
        required: true,
    },
    {
        name: 'Repeat',
        code: 'passwordRepeat',
        required: true,
    }
]

export default function AuthPopup({onHide}: any) {
    const [result, setResult]: any = useState({});
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [resetPasswordEmail, setResertPasswordEmail] = useState('');
    const fields = useMemo(() => {
        if (resetPasswordEmail) {
            return resetPasswordFields;
        }
        return authFields;
    }, [resetPasswordEmail]);
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

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <PopupFormWrapper
            title={title}
            isLoading={isLoading}
            isProcessing={isProcessing}
            onSubmit={submit}
            errorText={error}
        >
            <Input
                label="Email"
                onValueChange={(value: any) => setResult({...result, 'email': value})}
            />
            <Input
                label="Password"
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                onValueChange={(value: any) => setResult({...result, 'password': value})}
            />
        </PopupFormWrapper>
    )
}

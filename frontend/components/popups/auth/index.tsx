import styles from './index.module.scss'
import PopupFormWrapper from "~/components/popups/popupFormWrapper";
import {Button, Input} from "@nextui-org/react";

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

    const auth = () => {

    }

    return (
        <div>
            <Button onClick={() => {
                window.location.href = '/api/auth/google'
            }}>Auth</Button>
        </div>
    )
}

import {Button} from "@nextui-org/react";

export default function AuthPopup({onHide}: any) {
    return (
        <div>
            <Button onClick={() => {
                window.location.href = '/api/auth/google'
            }}>Auth</Button>
        </div>
    )
}

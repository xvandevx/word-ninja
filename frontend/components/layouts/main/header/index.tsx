import React, {useEffect, useState} from 'react';
import styles from './index.module.scss'
import {CSSTransition} from 'react-transition-group';
import {useRouter} from "next/router";
import {showPopup} from "~/redux/action-creaters/popup";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {useDispatch, useSelector} from "react-redux";
import {ThemeSwitch} from "~/components/theme-switch";
import {Avatar, Button, User} from "@nextui-org/react";

const links = [
    {
        name: 'Words',
        link: '/words'
    },
    {
        name: 'Sentences',
        link: '/sentences'
    },
    {
        name: 'Learn',
        link: '/learn'
    },
];

export default function Header({userData}: any) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
        setIsShow(true);
    }, []);
    const {learningWordIds, learnedWordIds} = useSelector((state: any) => state.learn)

    return (
        <header className='container'>
            <CSSTransition
                in={isShow}
                timeout={500}
                classNames="fade"
                unmountOnExit
            >
                <div className={styles.Header}>
                    <div className={styles.Logo}>Word Ninja</div>
                    {userData && (
                        <div className={styles.Menu}>
                            {links.map(link => (
                                <Button color={router.pathname.includes(link.link) ? 'secondary' : 'default'} onClick={() => {
                                    router.push(link.link);
                                }}>{link.name} {link.link.includes('learn') && `(${learningWordIds.length})`}</Button>
                            ))}
                        </div>
                    )}

                    <div className='flex gap-4'>
                        <ThemeSwitch />
                        {!!userData ? (<User name={userData['email']} avatarProps={{fallback: <Avatar showFallback src='https://images.unsplash.com/broken' />}}/>) : (<Button onClick={() => {
                            dispatch(showPopup(popupTypes.auth))
                        }}>Login</Button>)}
                    </div>
                </div>
            </CSSTransition>
        </header>
    );
};
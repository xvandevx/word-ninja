import React, {useEffect, useMemo, useState} from 'react';
import styles from './index.module.scss'
import {CSSTransition} from 'react-transition-group';
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, Link, User} from "@nextui-org/react";
import {WordStatuses} from "~/types/words/word";

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

    const {words} = useSelector((state: any) => state.word)

    const learningWordsCount = useMemo(() => {

        return words.filter((word: any) => {
            return [WordStatuses.Learning, WordStatuses.RepeatingMonth, WordStatuses.RepeatingSixMonth, WordStatuses.RepeatingYear].includes(word.status)
        }).length;
    }, [words]);

    return (
        <header className='container'>
            <CSSTransition
                in={isShow}
                timeout={500}
                classNames="fade"
                unmountOnExit
            >
                <div className={styles.Header}>
                    <a className={styles.Logo} href={'/'}>
                        <span>WORDS</span><img src='/ninja.svg'/><span>NINJA</span>
                    </a>
                    {userData && (
                        <div className={styles.Menu}>
                            {links.map(link => (
                                <Link key={link.link} color={router.pathname.includes(link.link) ? 'secondary' : 'foreground'} href={link.link}>
                                    {link.name} {link.link.includes('learn') && `(${learningWordsCount})`}
                                </Link>
                            ))}
                        </div>
                    )}

                    <div className='flex gap-4'>
                        {!!userData ? (<User
                            name={userData['name']}
                            avatarProps={{
                                fallback: <Avatar showFallback src='https://images.unsplash.com/broken' />,
                                src: userData.picture
                            }}/>
                        ) : (
                            <Button onClick={() => {
                                    window.location.href = '/api/auth/google'
                                    //dispatch(showPopup(popupTypes.auth))
                                }}
                            >Login</Button>
                        )}
                    </div>
                </div>
            </CSSTransition>
        </header>
    );
};
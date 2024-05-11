import React, {useEffect, useState} from 'react';
import styles from './index.module.scss'
import {CSSTransition} from 'react-transition-group';
import {useRouter} from "next/router";
import {showPopup} from "~/redux/action-creaters/popup";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {useDispatch, useSelector} from "react-redux";
import {ThemeSwitch} from "~/components/theme-switch";
import {Avatar, Button, Link, User} from "@nextui-org/react";

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
                    <a className={styles.Logo} href={'/'}>
                        <span>WORDS</span><img src='/ninja.svg'/><span>NINJA</span>
                    </a>
                    {userData && (
                        <div className={styles.Menu}>
                            {links.map(link => (
                                <Link key={link.link} color={router.pathname.includes(link.link) ? 'secondary' : 'foreground'} href={link.link}>
                                    {link.name} {link.link.includes('learn') && `(${learningWordIds.length})`}
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
import React, {useEffect, useMemo, useState} from 'react';
import styles from './index.module.scss'
import {CSSTransition} from 'react-transition-group';
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, Input, Link, Popover, PopoverContent, PopoverTrigger, User} from "@nextui-org/react";
import {WordStatuses} from "~/types/words/word";
import Cookies from "js-cookie";

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
    const {sentences} = useSelector((state: any) => state.sentence)

    const learningWordsCount = useMemo(() => {

        return words.filter((word: any) => {
            return [WordStatuses.Learning, WordStatuses.RepeatingMouth, WordStatuses.RepeatingSixMouth, WordStatuses.RepeatingYear].includes(word.status)
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
                                <Link key={link.link}
                                      color={router.pathname.includes(link.link) ? 'secondary' : 'foreground'}
                                      href={link.link}>
                                    {link.name}
                                    <span>
                                        {link.link.includes('learn') && `${learningWordsCount}`}
                                        {link.link.includes('word') && `${words.length}`}
                                        {link.link.includes('sentences') && `${sentences.length}`}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    )}

                    <div>
                        {!!userData ? (
                            <>
                                <Popover placement="bottom" showArrow={false} backdrop={"blur"}>
                                    <PopoverTrigger>
                                        <div className={styles.Burger}>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className={styles.Auth}>
                                            <User
                                                name={userData?.name}
                                                avatarProps={{
                                                    fallback: <Avatar showFallback src='https://images.unsplash.com/broken'/>,
                                                    src: userData?.picture
                                                }}/>
                                            <Button onClick={() => {
                                                Cookies.set('access_token', '')
                                                window.location.href = '/';
                                            }}>Logout</Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>

                                <div className={styles.User}>
                                    <User
                                        name={userData?.name}
                                        avatarProps={{
                                            fallback: <Avatar showFallback src='https://images.unsplash.com/broken'/>,
                                            src: userData?.picture
                                        }}/>
                                </div>
                            </>
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
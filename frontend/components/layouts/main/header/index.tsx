import React, {useEffect, useState} from 'react';
import styles from './index.module.scss'
import {CSSTransition, Transition} from 'react-transition-group';
import {useRouter} from "next/router";
import Button from "~/components/common/button";
import {showPopup} from "~/redux/action-creaters/popup";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {useDispatch} from "react-redux";
import Link from "next/link";
import clsx from "clsx";

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

export default function Header({user}: any) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
        setIsShow(true);
    }, []);

    return (
        <header className='container'>
            <CSSTransition
                in={isShow}
                timeout={1000}
                classNames="fade"
                unmountOnExit
            >
                <div className={styles.Header}>
                    <div className={styles.Logo}>Word Ninja</div>

                    {user && (
                        <div className={styles.Menu}>
                            {links.map(link => (
                                <Link href={link.link}><a className={clsx(router.pathname.includes(link.link) && styles.Selected)}>{link.name}</a></Link>
                            ))}
                        </div>
                    )}

                    {!!user ? (<div className={styles.User}>
                        <div className={styles.Avatar}>{user['name'][0]}</div>
                        <div className={styles.Name}>{user['name']}</div>
                    </div>) : (<Button onClick={() => {
                        dispatch(showPopup(popupTypes.auth))
                    }}>Login</Button>)}
                </div>
            </CSSTransition>
        </header>
    );
};
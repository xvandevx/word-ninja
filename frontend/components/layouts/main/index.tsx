import React, {useState} from 'react';
import styles from './index.module.scss'

import {useRouter} from "next/router";
import Head from "next/head";
import Header from "~/components/layouts/main/header";
import Popups from "~/components/popups";
export default function MainLayout({children, user}: any) {
    return (
        <div>
            <Head>
                <title>Word-ninja</title>
            </Head>
            <Header user={user}/>
            <div className='container'>
                {children}
            </div>
            <Popups/>
        </div>
    );
};
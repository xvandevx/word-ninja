import React, {useState} from 'react';
import styles from './index.module.scss'

import {useRouter} from "next/router";
import Head from "next/head";
import Header from "~/components/layouts/main/header";
import Popups from "~/components/popups";
export default function MainLayout({children, userData}: any) {
    return (
        <div>
            <Head>
                <title>Word-ninja</title>
                <meta name="viewport" content="width=device-width, user-scalable=no" />
            </Head>
            <Header userData={userData}/>

            {children}
            <Popups/>
        </div>
    );
};
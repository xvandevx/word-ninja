import styles from './index.module.scss'
import MainLayout from "~/components/layouts/main";
import {useEffect, useRef, useState} from "react";
import serverHandler from "~/pages/serverHandler";

export default function Home({userData}: any) {
    const [mainText, setMainText] = useState('_');
    const dataFetch: any = useRef({ rendered: false})

    useEffect(() => {
        if (!dataFetch.rendered) {
            init();
            dataFetch.rendered = true
        }
    }, []);

    const init = async () => {
        let i = 0;
        let isUnderLine = true;
        while (i < 4) {
            if (!isUnderLine) {
                await sleep(500);
                await setMainText('_');
            } else {
                await sleep(500);
                await setMainText('');
            }
            isUnderLine = !isUnderLine;
            i++;
        }
        await writeText('The best site to learn new words', setMainText);

    };

    return (
        <MainLayout userData={userData}>
            <div className={styles.MainText}>
                {mainText}
            </div>
        </MainLayout>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const data = await serverHandler(ctx);
    if (data.props.userData?.id) {
        return {
            redirect: {
                destination: '/words',
            },
        }
    }
    return data
}

export async function writeText(text: string, setText: (text: string) => {}) {
    let resText = '_';
    setText(resText);
    console.log('test', text)
    for (let i = 0; i < text.length; i++) {
        await sleep(getRandomArbitrary(20,80));
        resText = resText.substr(0, resText.length - 1);
        resText += text[i] + '_';
        setText(resText);
    }
    resText = resText.substr(0, resText.length - 1);
    setText(resText);
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

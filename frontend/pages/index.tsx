import styles from './index.module.scss'
import MainLayout from "~/components/layouts/main";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import serverHandler from "~/pages/serverHandler";

export default function Home({userData}: any) {
    const [mainText, setMainText] = useState('_');

    const router = useRouter();

    useEffect(() => {
        console.log(router);
        init();
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
    return await serverHandler(ctx)
}

export async function writeText(text: string, setText: (text: string) => {}) {
    let resText = '_';
    setText(resText);
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

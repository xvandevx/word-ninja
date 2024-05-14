import MainLayout from "~/components/layouts/main";
import {useDispatch} from "react-redux";
import {useEffect, useRef, useState} from "react";
import serverHandler from "~/utils/serverHandler";
import {getLearnedWords, getLearningWords} from "~/redux/action-creaters/learn";
import LearnComponent from "~/components/pages/learn";
import {getWords} from "~/redux/action-creaters/word";
import {getWordCategory} from "~/redux/action-creaters/category";


export default function Sentences({userData}: any) {
    const dispatch = useDispatch();
    const dataFetch: any = useRef({ rendered: false})
    const [isLoaded, setIsLoaded] = useState(false);

    const loadData = async () => {
        if (!dataFetch.rendered) {
            // @ts-ignore
            await dispatch(getWords());
            // @ts-ignore
            await dispatch(getWordCategory());
            setIsLoaded(true);
        }
    }

    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
        setIsShow(true);
    }, []);

    useEffect(() => {
        if (!dataFetch.rendered) {
            loadData();
            dataFetch.rendered = true
        }
    }, []);

    return (
        <MainLayout userData={userData}>
            <LearnComponent/>
        </MainLayout>
    )
}

export const getServerSideProps = async (ctx: any) => {
    return await serverHandler(ctx)
}
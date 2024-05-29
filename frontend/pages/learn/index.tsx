import MainLayout from "~/components/layouts/main";
import {useDispatch} from "react-redux";
import {useEffect, useRef, useState} from "react";
import serverHandler from "~/utils/serverHandler";
import LearnComponent from "~/components/pages/learn";
import {getWords} from "~/redux/action-creaters/word";
import {getWordCategory} from "~/redux/action-creaters/category";
import {getSentences} from "~/redux/action-creaters/sentense";
import {AppDispatch} from "~/redux";


export default function Sentences({userData}: any) {
    const dispatch: AppDispatch = useDispatch();
    const dataFetch: any = useRef({ rendered: false})
    const [isLoaded, setIsLoaded] = useState(false);

    const loadData = async () => {
        if (!dataFetch.rendered) {
            await dispatch(getWords());
            await dispatch(getSentences());
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
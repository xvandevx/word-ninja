import MainLayout from "~/components/layouts/main";
import {useDispatch} from "react-redux";
import {useEffect, useRef, useState} from "react";
import serverHandler from "~/utils/serverHandler";
import {getSentenceCategory, getWordCategory} from "~/redux/action-creaters/category";
import SentencesComponent from "~/components/pages/sentences";
import {getSentences} from "~/redux/action-creaters/sentense";
import {Spinner} from "@nextui-org/react";
import {CSSTransition} from 'react-transition-group';

export default function Sentences({userData}: any) {
    const dispatch = useDispatch();
    const dataFetch: any = useRef({ rendered: false})
    const [isLoaded, setIsLoaded] = useState(false);

    const loadData = async () => {
        if (!dataFetch.rendered) {
            // @ts-ignore
            await dispatch(getSentences());
            // @ts-ignore
            await dispatch(getSentenceCategory());
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
            {!isLoaded && (
                <div className='flex justify-center'>
                    <Spinner />
                </div>
            )}
            <CSSTransition
                in={isLoaded}
                timeout={500}
                classNames="fade-up"
                unmountOnExit
            >
                <SentencesComponent/>
            </CSSTransition>

        </MainLayout>
    )
}

export const getServerSideProps = async (ctx: any) => {
    return await serverHandler(ctx)
}
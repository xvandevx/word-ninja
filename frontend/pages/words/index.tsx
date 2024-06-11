import MainLayout from "~/components/layouts/main";
import {useDispatch} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {getWords} from "~/redux/action-creaters/word";
import serverHandler from "~/utils/serverHandler";
import {getWordCategory} from "~/redux/action-creaters/category";
import WordsComponent from "~/components/pages/words";
import {Spinner} from "@nextui-org/react";
import {CSSTransition} from 'react-transition-group';
import {getSentences} from "~/redux/action-creaters/sentense";
import {AppDispatch} from "~/redux";
import AddNew from "~/components/common/addNew";

export default function Words({userData}: any) {
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
            <div className='container'>
                {!isLoaded && (
                    <div className='flex justify-center'>
                        <Spinner/>
                    </div>
                )}
                <CSSTransition
                    in={isLoaded}
                    timeout={500}
                    classNames="fade-up"
                    unmountOnExit
                >
                    <WordsComponent/>
                </CSSTransition>
                <AddNew/>
            </div>
        </MainLayout>
)
}

export const getServerSideProps = async (ctx: any) => {
    return await serverHandler(ctx)
}
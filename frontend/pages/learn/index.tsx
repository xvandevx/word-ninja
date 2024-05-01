import MainLayout from "~/components/layouts/main";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import serverHandler from "~/pages/serverHandler";
import {getLearnedWords, getLearningWords} from "~/redux/action-creaters/learn";
import LearnComponent from "~/components/pages/learn";


export default function Sentences({userData}: any) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLearningWords());
        dispatch(getLearnedWords());
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
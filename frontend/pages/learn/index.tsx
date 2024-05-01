import MainLayout from "~/components/layouts/main";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import serverHandler from "~/utils/serverHandler";
import {getLearnedWords, getLearningWords} from "~/redux/action-creaters/learn";
import LearnComponent from "~/components/pages/learn";


export default function Sentences({userData}: any) {
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(getLearningWords());
        // @ts-ignore
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
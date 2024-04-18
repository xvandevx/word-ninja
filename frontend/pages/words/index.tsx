import MainLayout from "~/components/layouts/main";
import Side from "~/components/layouts/side";
import Panel from "~/components/common/panel";
import Categories from "~/components/common/categories";
import Table from "~/components/common/table";
import {showPopup} from "~/redux/action-creaters/popup";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getWords} from "~/redux/action-creaters/word";
import serverHandler from "~/pages/serverHandler";
import {getWordCategory} from "~/redux/action-creaters/category";

const words = [
    {
        name: 'spoon',
        translation: 'Ложка'
    },
    {
        name: 'Cattle',
        translation: 'Чайник'
    },
]

export default function Words({userData}: any) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWords());
        dispatch(getWordCategory());
    }, []);

    return (
        <MainLayout userData={userData}>
            <Side side={<Categories/>}>
                <Table items={words}/>
            </Side>
            <Panel links={[
                {
                    name: '+',
                    action: () => {
                        dispatch(showPopup(popupTypes.addWord))
                    }
                },
                {
                    name: 'Learn',
                    action: () => {

                    }
                }
            ]}/>
        </MainLayout>
    )
}

export const getServerSideProps = async (ctx: any) => {
    return await serverHandler(ctx)
}
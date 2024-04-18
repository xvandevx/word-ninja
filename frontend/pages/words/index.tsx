import MainLayout from "~/components/layouts/main";
import Side from "~/components/layouts/side";
import Panel from "~/components/common/panel";
import Categories from "~/components/common/categories";
import Table from "~/components/common/table";
import {showPopup} from "~/redux/action-creaters/popup";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getWordCategory, getWords} from "~/redux/action-creaters/word";

const categorys = [
    'kitchen',
    'car'
]

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

export default function Words({user}: any) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWords());
        dispatch(getWordCategory());
    }, []);

    return (
        <MainLayout user={user}>
            <Side side={<Categories items={categorys}/>}>
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

export const getServerSideProps = () => {
    console.log('testset')
    return {
        props: {
            user: {
                id: 1,
                name: 'Ivan'
            }
        }
    }
}
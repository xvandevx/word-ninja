import ContentTable from "../../common/contentTable";
import {useDispatch, useSelector} from "react-redux";
import {Api} from "~/api";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {getWords} from "~/redux/action-creaters/word";
import {AppDispatch} from "~/redux";

export default function WordsComponent() {
    const dispatch: AppDispatch = useDispatch();

    const {words} = useSelector((state: any) => state.word)
    const {wordCategorys} = useSelector((state: any) => state.category)

    return (
        <>
            <ContentTable
                items={words}
                name='word'
                categorys={wordCategorys}
                handleDeleteItem={async (itemId: any) => {
                    await Api.words.delete(itemId);
                }}
                handleGetItems={async () => {
                    await dispatch(getWords());
                }}
                addItemPopupType={popupTypes.addWord}
            >
            </ContentTable>
        </>
    )
}
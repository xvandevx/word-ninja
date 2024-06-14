import {useDispatch, useSelector} from "react-redux";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {Api} from "~/api";
import {getSentences} from "~/redux/action-creaters/sentense";
import ContentTable from "~/components/common/contentTable";
import {AppDispatch} from "~/redux"

export default function SentencesComponent() {
    const dispatch: AppDispatch = useDispatch();
    const {sentences} = useSelector((state: any) => state.sentence)
    const {sentenceCategorys} = useSelector((state: any) => state.category)

    return (
        <div>
            <ContentTable
                setSelectedKeys={() => {}}
                items={sentences}
                name='sentence'
                categorys={sentenceCategorys}
                handleDeleteItem={async (itemId: any) => {
                    await Api.sentences.delete(itemId);
                }}
                handleGetItems={async () => {
                    await dispatch(getSentences());
                }}
                addItemPopupType={popupTypes.addSentence}
            />
        </div>
    )
}
import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useMemo, useState} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Input,
    Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Tooltip
} from "@nextui-org/react";
import {ChevronDownIcon, DeleteIcon, EditIcon} from "@nextui-org/shared-icons";
import {showPopup} from "~/redux/action-creaters/popup";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {DeleteUser} from "~/components/common/detele";
import {Api} from "~/api";
import {getWords} from "~/redux/action-creaters/word";
import {WordStatusNames} from "~/types/words/wordFe";
import {WordStatuses} from "~/types/words/word";
import {getSentences} from "~/redux/action-creaters/sentense";
import ContentTable from "~/components/common/contentTable";

export default function SentencesComponent() {
    const dispatch = useDispatch();
    const {sentences} = useSelector((state: any) => state.sentence)
    const {sentenceCategorys} = useSelector((state: any) => state.category)
    const {selectedCategory} = useSelector((state: any) => state.state)
    const [deleteItem, setDeleteItem] = useState(null);

    const doDeleteItem = async () => {
        await Api.sentences.delete(deleteItem.id);
        setDeleteItem(null);
        dispatch(getSentences());
    }

    const categorysByIds = useMemo(() => {
        const categorys = {}
        sentenceCategorys.map(item => {
            categorys[item.id] = item;
        });
        return categorys;
    }, [sentenceCategorys])

    return (
        <div>
            <ContentTable
                setSelectedKeys={() => {}}
                items={sentences}
                name='sentence'
                categorys={sentenceCategorys}
                handleDeleteItem={async (itemId) => {
                    await Api.sentences.delete(itemId);
                }}
                handleGetItems={async () => {
                    await dispatch(getSentences());
                }}
                addItemPopupType={popupTypes.addSentence}
                columns={{
                    Sentence: (item) => (<>
                        <p className="text-bold text-sm capitalize">{item.sentence}</p>
                        {item.comment && <p className="text-bold text-sm capitalize text-default-400">{item.comment}</p>}
                    </>),
                    Translation: (item) => item.translation,
                    Categories: (item) => item.categorys.filter(item => categorysByIds[item.id]).map(item => (
                        <Chip className="capitalize"  size="sm" variant="flat">
                            {categorysByIds[item.id]?.name}
                        </Chip>
                    )),
                }}
                isSelectionableTable={false}
            />
        </div>
    )
}
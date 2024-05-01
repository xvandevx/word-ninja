import ContentTable from "../../common/contentTable";
import styles from "~/components/common/contentTable/index.module.scss";
import {Button, Chip, Spinner, TableColumn, TableHeader} from "@nextui-org/react";
import {setLearnedWords, setLearningWords} from "~/redux/action-creaters/learn";
import {useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Api} from "~/api";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {WordStatusNames} from "~/types/words/wordFe";
import {getWords} from "~/redux/action-creaters/word";

export default function WordsComponent() {
    const dispatch = useDispatch();
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const {words} = useSelector((state: any) => state.word)
    const {wordCategorys} = useSelector((state: any) => state.category)

    const categorysByIds = useMemo(() => {
        const categorysByIds = {}
        wordCategorys.map((item: any) => {
            // @ts-ignore
            categorysByIds[item.id] = item;
        });
        return categorysByIds;
    }, [wordCategorys])

    // @ts-ignore
    return (
        <>
            <ContentTable
                setSelectedKeys={setSelectedKeys}
                items={words}
                name='word'
                categorys={wordCategorys}
                handleDeleteItem={async (itemId: any) => {
                    await Api.words.delete(itemId);
                }}
                handleGetItems={async () => {
                    // @ts-ignore
                    await dispatch(getWords());
                }}
                addItemPopupType={popupTypes.addWord}
                columns={{
                    Word: (item: any) => (<>
                        <p className="text-bold text-sm capitalize">{item.word}</p>
                        {item.comment && <p className="text-bold text-sm capitalize text-default-400">{item.comment}</p>}
                    </>),
                    Translation: (item: any) => item.translation,
                    // @ts-ignore
                    Categories: (item: any) => item.categorys.filter((item: any) => categorysByIds[item.id]).map((item: any) => (
                        <Chip className="capitalize"  size="sm" variant="flat" key={item.id}>
                            {
                                // @ts-ignore
                                categorysByIds[item.id]?.name
                            }
                        </Chip>
                    )),
                    // @ts-ignore
                    Status: (item: any) => WordStatusNames[item.status],
                    ['+/-']: (item: any) => `${item.pluses}/${item.minuses}`
                }}
                isSelectionableTable={true}
            />
            {  // @ts-ignore
            [...selectedKeys].length > 0 && (
                <div className={styles.PanelWrapper}>
                    <div className={styles.Panel}>
                        <Button onClick={() => {
                            // @ts-ignore
                            dispatch(setLearningWords([...selectedKeys]));
                            // @ts-ignore
                            dispatch(setLearnedWords([]));
                            window.location.href = '/learn'
                        }}>Learn {
                            // @ts-ignore
                            [...selectedKeys].length} word{[...selectedKeys].length > 1 && 's'}</Button>
                        {/*<Button>Delete</Button>
                        <Button>Change status</Button>
                        <Button>Add category</Button>*/}
                    </div>
                </div>
            )}
        </>
    )
}
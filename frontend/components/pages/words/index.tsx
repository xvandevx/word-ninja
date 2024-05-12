import ContentTable from "../../common/contentTable";
import styles from "./index.module.scss";
import {Button, Chip} from "@nextui-org/react";
import {useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Api} from "~/api";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {WordStatusNames} from "~/types/words/wordFe";
import {getWords} from "~/redux/action-creaters/word";
import {GoogleIcon} from "~/components/icons/google";
import {YandexIcon} from "~/components/icons/yandex";
import clsx from "clsx";
import {setLearnedWords, setLearningWords} from "~/redux/action-creaters/learn";
import Checkbox from "~/components/common/checkbox";

export default function WordsComponent() {
    const dispatch = useDispatch();
    const [selectedKeys, setSelectedKeys]: any = useState({});
    const {words} = useSelector((state: any) => state.word)
    const {wordCategorys} = useSelector((state: any) => state.category)

    const categorysByIds: any = useMemo(() => {
        const categorysByIds = {}
        wordCategorys.map((item: any) => {
            // @ts-ignore
            categorysByIds[item.id] = item;
        });
        return categorysByIds;
    }, [wordCategorys])

    const selectedKeyIds: any = useMemo(() => {
        // @ts-ignore
        return Object.keys(selectedKeys).filter((id: number) => selectedKeys[id]) || [];
    }, [selectedKeys])

    const [currentIds, setCurrentIds]: any = useState([]);

    const isAllSelected = useMemo(() => {
        return selectedKeyIds.length === currentIds.length
    }, [selectedKeyIds, currentIds])

    return (
        <>
            <ContentTable
                setCurrentIds={(currentIds: any) => {
                    setCurrentIds(currentIds)
                }}
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
                tableHead={
                    <div className={clsx(styles.TableHead, styles.TableGrid)}>
                        <div><Checkbox isChecked={isAllSelected} onChange={() => {
                            console.log('asdad1', isAllSelected)
                            if (!isAllSelected) {
                                const selectedKeys = {};
                                currentIds.map((item: any) => {
                                    // @ts-ignore
                                    selectedKeys[item] = true;
                                })
                                setSelectedKeys(selectedKeys)
                            } else {
                                setSelectedKeys({})
                            }
                            console.log('asdad', selectedKeys, selectedKeyIds, currentIds)
                        }}/></div>
                        <div>Word</div>
                        <div>Translation</div>
                        <div>Status</div>
                        <div>Categories</div>
                        <div></div>
                    </div>
                }
                tableBodyItem={(item: any, actions: any) =>
                    <div className={clsx(styles.TableItem, styles.TableGrid)} onClick={(e) => {
                        setSelectedKeys({...selectedKeys, [item.id]: !selectedKeys[item.id]})
                    }}>
                        <div><Checkbox isChecked={selectedKeys[item.id]} isReadOnly={true}/> </div>
                        <div>
                            <div className='flex'>
                                <span>{item.word}</span>
                            </div>
                            <div className='flex gap-2'>
                                <a
                                    href={`https://translate.google.com/?hl=ru&sl=en&tl=ru&text=${item.word || item.sentence}%0A&op=translate`}
                                    target="_blank"
                                    rel="nofollow"
                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                >
                                    <GoogleIcon />
                                </a>
                                <a
                                    href={`https://translate.yandex.ru/?utm_source=main_stripe_big&source_lang=en&target_lang=ru&text=${item.word || item.sentence}`}
                                    target="_blank"
                                    rel="nofollow"
                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                >
                                    <YandexIcon />
                                </a>
                            </div>
                            {item.comment && <p className="text-bold text-sm capitalize text-default-400">{item.comment}</p>}
                            <div className={styles.Pluses}>{item.pluses}/{item.minuses}</div>

                        </div>
                        <div>{item.translation}</div>
                        <div className={styles.Status}>
                            <Chip className="capitalize"  size="sm" variant="flat">
                                {
                                    // @ts-ignore
                                    WordStatusNames[item.status]}
                            </Chip>

                        </div>
                        <div className={styles.Cats}>{item.categorys.filter((item: any) => categorysByIds[item.id]).map((item: any) => (
                            <Chip className="capitalize"  size="sm" variant="flat" key={item.id}>
                                {
                                    // @ts-ignore
                                    categorysByIds[item.id]?.name
                                }
                            </Chip>
                        ))}</div>
                        <div className={styles.Actions}>{actions}</div>
                    </div>
                }
            >
            </ContentTable>
            {  // @ts-ignore
            selectedKeyIds.length > 0 && (
                <div className={styles.PanelWrapper}>
                    <div className={styles.Panel}>
                        <Button onClick={() => {
                            // @ts-ignore
                            dispatch(setLearningWords(selectedKeyIds));
                            // @ts-ignore
                            dispatch(setLearnedWords([]));
                            window.location.href = '/learn'
                        }}>Learn {
                            // @ts-ignore
                            selectedKeyIds.length} word{selectedKeyIds.length > 1 && 's'}</Button>

                    </div>
                </div>
            )}
        </>
    )
}
import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useMemo, useState} from "react";
import {
    Chip,
} from "@nextui-org/react";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {Api} from "~/api";
import {getSentences} from "~/redux/action-creaters/sentense";
import ContentTable from "~/components/common/contentTable";
import clsx from "clsx";
import {GoogleIcon} from "~/components/icons/google";
import {YandexIcon} from "~/components/icons/yandex";
import {AppDispatch} from "~/redux";

export default function SentencesComponent() {
    const dispatch: AppDispatch = useDispatch();
    const {sentences} = useSelector((state: any) => state.sentence)
    const {sentenceCategorys} = useSelector((state: any) => state.category)
    const {selectedCategory} = useSelector((state: any) => state.state)
    const [deleteItem, setDeleteItem] = useState(null);

    const doDeleteItem = async () => {
        // @ts-ignore
        await Api.sentences.delete(deleteItem.id);
        setDeleteItem(null);
        dispatch(getSentences());
    }

    const categorysByIds: any = useMemo(() => {
        const categorys = {}
        sentenceCategorys.map((item: any) => {
            // @ts-ignore
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
                handleDeleteItem={async (itemId: any) => {
                    await Api.sentences.delete(itemId);
                }}
                handleGetItems={async () => {
                    await dispatch(getSentences());
                }}
                addItemPopupType={popupTypes.addSentence}
                isSelectionableTable={false}
                tableHead={
                    <div className={clsx(styles.TableHead, styles.TableGrid)}>
                        <div>Sentence</div>
                        <div>Translation</div>
                        <div>Categories</div>
                        <div></div>
                    </div>
                }
                tableBodyItem={(item: any, actions: any) =>
                    <div className={clsx(styles.TableItem, styles.TableGrid)}>
                        <div>
                            <div className='flex'>
                                <span>{item.sentence}</span>
                            </div>
                            <div className='flex gap-2'>
                                <a
                                    href={`https://translate.google.com/?hl=ru&sl=en&tl=ru&text=${item.sentence}%0A&op=translate`}
                                    target="_blank"
                                    rel="nofollow"
                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                >
                                    <GoogleIcon />
                                </a>
                                <a
                                    href={`https://translate.yandex.ru/?utm_source=main_stripe_big&source_lang=en&target_lang=ru&text=${item.sentence}`}
                                    target="_blank"
                                    rel="nofollow"
                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                >
                                    <YandexIcon />
                                </a>
                            </div>
                            {item.comment && <p className="text-bold text-sm capitalize text-default-400">{item.comment}</p>}
                        </div>
                        <div>{item.translation}</div>
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

            />
        </div>
    )
}
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
import {AppDispatch} from "~/redux";
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai";

export default function WordsComponent() {
    const dispatch: AppDispatch = useDispatch();

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

    const [searchTranslatedWord, setSearchTranslatedWord] = useState('');

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
                searchTranslatedWord={searchTranslatedWord}
                tableBodyItem={(item: any, actions: any, checkbox: any) =>
                    <div className={styles.TableItemWrapper}>
                        <div className={clsx(styles.TableItem, styles.TableGrid)}>
                            <div>{checkbox}</div>
                            <div className={styles.TableItemWord}>
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
                                        <GoogleIcon/>
                                    </a>
                                    <a
                                        href={`https://translate.yandex.ru/?utm_source=main_stripe_big&source_lang=en&target_lang=ru&text=${item.word || item.sentence}`}
                                        target="_blank"
                                        rel="nofollow"
                                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                    >
                                        <YandexIcon/>
                                    </a>
                                </div>
                                {item.comment &&
                                    <p className="text-bold text-sm capitalize text-default-400">{item.comment}</p>}


                            </div>
                            <div>{item.translation ? item.translation : (
                                <Button size="sm" color="warning" onClick={async () => {
                                    const translate = await Api.translate.get(item.word, 'en', 'ru')

                                    if (translate?.translations?.length > 0) {
                                        if (item.id) {
                                            await Api.words.update(item.id, {
                                                translation: translate.translations[0].text,
                                            });
                                            await dispatch(getWords());
                                        } else {
                                            setSearchTranslatedWord(translate.translations[0].text)
                                        }
                                    }
                                }}>Translate</Button>
                            )}</div>


                            <div className={styles.Actions}>{actions}</div>
                        </div>
                        <div className={styles.TableItemBottom}>
                            <div className={styles.TableDate}>
                                {item.date}
                            </div>
                            <div className={styles.Status}>
                                <Chip className="capitalize" size="sm" variant="flat">
                                    {
                                        // @ts-ignore
                                        WordStatusNames[item.status]}
                                </Chip>

                            </div>
                            <div className={styles.Pluses}>
                                <span><AiOutlineLike />{item.pluses}</span>
                                <span><AiOutlineDislike />{item.minuses}</span>
                            </div>

                            <div
                                className={styles.Cats}>{item.categorys.filter((item: any) => categorysByIds[item.id]).map((item: any) => (
                                <Chip className="capitalize" size="sm" variant="flat" key={item.id}>
                                    {
                                        // @ts-ignore
                                        categorysByIds[item.id]?.name
                                    }
                                </Chip>
                            ))}</div>
                        </div>
                    </div>
                }
            >
            </ContentTable>
        </>
    )
}
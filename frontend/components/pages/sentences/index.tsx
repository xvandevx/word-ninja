import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useMemo, useState} from "react";
import {
    Button,
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
import {getWords} from "~/redux/action-creaters/word";
import {WordStatusNames} from "~/types/words/wordFe";
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai";

export default function SentencesComponent() {
    const dispatch: AppDispatch = useDispatch();
    const {sentences} = useSelector((state: any) => state.sentence)
    const {sentenceCategorys} = useSelector((state: any) => state.category)

    const categorysByIds: any = useMemo(() => {
        const categorys = {}
        sentenceCategorys.map((item: any) => {
            // @ts-ignore
            categorys[item.id] = item;
        });
        return categorys;
    }, [sentenceCategorys])

    const [searchTranslatedWord, setSearchTranslatedWord] = useState('');

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
                searchTranslatedWord={searchTranslatedWord}
                tableBodyItem={(item: any, actions: any, checkbox: any) =>
                    <div className={styles.TableItemWrapper}>
                        <div className={clsx(styles.TableItem, styles.TableGrid)}>
                            <div>{checkbox}</div>
                            <div className={styles.TableItemWord}>
                                <div className='flex'>
                                    <span>{item.sentence}</span>
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
                                    const translate = await Api.translate.get(item.sentence, 'en', 'ru')

                                    if (translate?.translations?.length > 0) {
                                        if (item.id) {
                                            await Api.sentences.update(item.id, {
                                                translation: translate.translations[0].text,
                                            });
                                            await dispatch(getSentences());
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
                                        categorysByIds[item.id]?.name
                                    }
                                </Chip>
                            ))}</div>
                        </div>
                    </div>
                }
            />
        </div>
    )
}
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
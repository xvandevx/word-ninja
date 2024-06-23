import styles from "./index.module.scss";
import {
    Button
} from "@nextui-org/react";
import {useDispatch, useSelector} from "react-redux";
import {useMemo, useRef, useState} from "react";
import {Api} from "~/api";
import {EditIcon} from "@nextui-org/shared-icons";
import {showPopup} from "~/redux/action-creaters/popup";
import {GoogleIcon} from "~/components/icons/google";
import {YandexIcon} from "~/components/icons/yandex";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {WordStatuses} from "~/types/words/word";
import {getWords, updateWord} from "~/redux/action-creaters/word";
import clsx from "clsx";
import {AppDispatch} from "~/redux";
import {
    BsArrowRepeat,
    BsCheck2Circle, BsChevronLeft, BsChevronRight,
    BsEye,
    BsReverseListColumnsReverse,
} from "react-icons/bs";
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai";

enum LearnTypes {
    EnRu = 'En-Ru',
    RuEn = 'Ru-En',
}

export default function Card() {
    const {words} = useSelector((state: any) => state.word)

    return (
        <div className={styles.LearnWrapper}>
            <Slider>Slide.</Slider>
        </div>
    )
}

import React, { ReactNode } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'


const left = {
    bg: `linear-gradient(120deg, #f093fb 0%, #f5576c 100%)`,
    justifySelf: 'end',
}
const right = {
    bg: `linear-gradient(120deg, #96fbc4 0%, #f9f586 100%)`,
    justifySelf: 'start',
}

const Slider = ({ children }: { children: ReactNode }) => {
    const [{ x, bg, scale, justifySelf }, api] = useSpring(() => ({
        x: 0,
        scale: 1,
        ...left,
    }))
    const bind = useDrag(({ active, movement: [x] }) =>
        api.start({
            x: active ? x : 0,
            scale: active ? 1.1 : 1,
            ...(x < 0 ? left : right),
            immediate: name => active && name === 'x',
        })
    )

    const avSize = x.to({
        map: Math.abs,
        range: [50, 300],
        output: [0.5, 1],
        extrapolate: 'clamp',
    })

    return (
        <animated.div {...bind()} className={styles.item} style={{ background: bg }}>
            <animated.div className={styles.av} style={{ scale: avSize, justifySelf }} />
            <animated.div className={styles.fg} style={{ x, scale }}>
                {children}
            </animated.div>
        </animated.div>
    )
}

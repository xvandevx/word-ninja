import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useMemo, useState, useCallback, useEffect} from "react";
import {
    Input,
    Button,
    Tooltip, Pagination, Select, SelectItem, Chip
} from "@nextui-org/react";
import {DeleteIcon, EditIcon} from "@nextui-org/shared-icons";
import {showPopup} from "~/redux/action-creaters/popup";
import {DeleteUser} from "~/components/common/detele";
import {WordStatusNames} from "~/types/words/wordFe";
import Category from "./category";
import {WordStatuses} from "~/types/words/word";
import clsx from "clsx";
import {AppDispatch} from "~/redux";
import Checkbox from "~/components/common/checkbox";
import {Api} from "~/api";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import {GoogleIcon} from "~/components/icons/google";
import {YandexIcon} from "~/components/icons/yandex";
import {getWords} from "~/redux/action-creaters/word";
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai";
import {daysDifference} from "~/utils";
import {getSentences} from "~/redux/action-creaters/sentense";

const Repeats: Record<number, number> = {
    1: 60,
    2: 180,
    3: 365
}

export default function ContentTable({
    name,
    addItemPopupType,
    items,
    categorys,
    handleDeleteItem,
    handleGetItems,
    tableHead,
}: any) {
    const dispatch: AppDispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [deleteItem, setDeleteItem]: any = useState(null);
    const [filterValue, setFilterValue] = useState("");
    const [filterSymbol, setFilterSymbol] = useState("");
    const [statusFilter, setStatusFilter]: any = useState([]);

    const onRowsPerPageChange = useCallback((value: any) => {
        setPage(1)
        setRowsPerPage(value);
    }, []);

    const categorysByIds: any = useMemo(() => {
        const categorysItems = {}
        categorys.map((item: any) => {
            // @ts-ignore
            if (item) {
                categorys[item.id] = item;
            }
        });
        return categorysItems;
    }, [categorys])

    const [searchTranslatedWord, setSearchTranslatedWord] = useState('');


    const [rowsPerPage, setRowsPerPage] = useState(20);

    const doDeleteItem = async () => {
        await handleDeleteItem(deleteItem.id)
        setDeleteItem(null);
        handleGetItems();
    }

    const statusFilterArray = useMemo(() => {
        return [...statusFilter].map(item => +item);
    }, [statusFilter])

    const itemsFormated = useMemo(() => {
        return items.map((item: any) => {
            const date = new Date(item.createdAt);
            let status = item.status || WordStatuses.NewWord;
            let statusInfo = '';
            if (item.status === WordStatuses.Learned) {
                const days = daysDifference(item.lastStatusDate) + Repeats[item.learnCount];
                if (days <= 0) {
                    status = WordStatuses.NeedToRepeat;
                } else {
                    statusInfo = `repeat in ${days} days`;
                }
            }

            return {
                ...item,
                statusInfo,
                status,
                pluses: item.pluses || 0,
                minuses: item.minuses || 0,
                date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
            }
        })
    }, [items])

    const itemsFiltered = useMemo(() => {
        let items = itemsFormated
        if (filterValue) {
            items = items.filter((item: any) => item.word?.includes(filterValue) || item.translation?.includes(filterValue) || item.sentence?.includes(filterValue))
            if (items.length === 0) {
                items.push({
                    status: WordStatuses.NewWord,
                    word: filterValue,
                    translation: searchTranslatedWord,
                    categorys: []
                })
            }
        } else {
            if (selectedCategory) {
                items = items.filter((item: any) => {
                    return item.categorys.map((categorys: any) => categorys?.id).includes(selectedCategory)
                })
            }
            if (statusFilterArray.length > 0) {
                items = items.filter((item: any) => {
                    return statusFilterArray.includes(item.status);
                })
            }

            if (filterSymbol) {
                items = items.filter((item: any) => {
                    return item.word[0].toLowerCase() === filterSymbol.toLowerCase();
                })
            }
        }

        return items;
    }, [itemsFormated, selectedCategory, statusFilterArray, filterValue, filterSymbol, searchTranslatedWord])

    const sorts = ['Date', 'Word', 'Translation'];
    const [sortItem, setSortItem]: any = useState(sorts[0]);
    const [sortDirection, setSortDirection]: any = useState('desc');
    const itemsFilteredAndSorted = useMemo(() => {
        const items = [...itemsFiltered];
        if (sortItem === sorts[0]) {
            items.sort((a: any, b: any) => {
                if (a.id < b.id) {
                    return sortDirection === 'asc' ? -1 : 1;
                }
                if (a.id > b.id) {
                    return sortDirection === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        if (sortItem === sorts[1]) {
            items.sort((a: any, b: any) => {
                if (a.word < b.word) {
                    return sortDirection === 'asc' ? -1 : 1;
                }
                if (a.word > b.word) {
                    return sortDirection === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        if (sortItem === sorts[2]) {
            items.sort((a: any, b: any) => {
                if (a.translation < b.translation) {
                    return sortDirection === 'asc' ? -1 : 1;
                }
                if (a.translation > b.translation) {
                    return sortDirection === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return items;

    }, [itemsFiltered, sortItem, sortDirection])

    const wordsFilteredPaged = useMemo(() => {
        return itemsFilteredAndSorted.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
    }, [itemsFilteredAndSorted, page, rowsPerPage]);

    useEffect(() => {
        setCurrentIds(wordsFilteredPaged.map((item: any) => item.id))
    }, [wordsFilteredPaged]);

    const symbols: string[] = 'A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z'.split(', ');

    const actions = (item: any) => item.id ? (
        <>
            <Button variant="light" disableAnimation={true} size="sm" onClick={(e) => {
                dispatch(showPopup(addItemPopupType, item));
            }}>
                 <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon/>
                </span>
            </Button>
            <Tooltip
                content={
                    <DeleteUser
                        name={` item ${deleteItem?.id}`}
                        onDelete={() => {
                            doDeleteItem()
                        }}
                        onCancel={() => {
                            setDeleteItem(null)
                        }}
                    />
                }
                placement='top'
                isOpen={deleteItem?.id === item.id ? true : false}
            >
                <Button variant="light" disableAnimation={true} size="sm" onClick={() => {
                    setDeleteItem(item);
                }}>
                    <div className="text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon/>
                    </div>
                </Button>
            </Tooltip>
        </>
    ) : (
        <Button disableAnimation={true} size="sm" onClick={(e) => {
            dispatch(showPopup(addItemPopupType, item));
        }}> Add word</Button>
    )


    const tableBodyItem = (item: any) => <div className={styles.TableItemWrapper}  onClick={(e: any) => {
        setSelectedKeys({...selectedKeys, [item.id]: !selectedKeys[item.id]})
    }}>
        <div className={clsx(styles.TableItem, styles.TableGrid)}>
            <div>{checkbox(item)}</div>
            <div className={styles.TableItemWord}>
                <div className='flex'>
                    <span>{item.word || item.sentence}</span>
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
                    const translate = await Api.translate.get(item.word || item.sentence, 'en', 'ru')

                    if (translate?.translations?.length > 0) {
                        if (item.id) {
                            if (name === 'word') {
                                await Api.words.update(item.id, {
                                    translation: translate.translations[0].text,
                                });
                                await dispatch(getWords());
                            } else {
                                await Api.sentences.update(item.id, {
                                    translation: translate.translations[0].text,
                                });
                                await dispatch(getSentences());
                            }
                        } else {
                            setSearchTranslatedWord(translate.translations[0].text)
                        }
                    }
                }}>Translate</Button>
            )}</div>


            <div className={styles.Actions}>{actions(item)}</div>
        </div>
        <div className={styles.TableItemBottom}>
            <div className={styles.TableDate}>
                {item.date}
            </div>
            <div className={styles.Status}>
                <Chip className="capitalize" size="sm" variant="flat">
                    {
                        // @ts-ignore
                        WordStatusNames[item.status]}{item.statusInfo && `, ${item.statusInfo}`}
                </Chip>

            </div>
            <div className={styles.Pluses}>
                <span><AiOutlineLike/>{item.pluses}</span>
                <span><AiOutlineDislike/>{item.minuses}</span>
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

    const [selectedKeys, setSelectedKeys]: any = useState({});
    const checkbox = (item: any) => <Checkbox isChecked={selectedKeys[item.id]} isReadOnly={true}/>

    const selectedKeyIds: any = useMemo(() => {
        // @ts-ignore
        return Object.keys(selectedKeys).filter((id: number) => selectedKeys[id]) || [];
    }, [selectedKeys])

    const [currentIds, setCurrentIds]: any = useState([]);

    const isAllSelected = useMemo(() => {
        return selectedKeyIds.length === currentIds.length
    }, [selectedKeyIds, currentIds])

    const [scrollBottom, setScrollBottom] = useState(false);

    window.onscroll = function(ev) {
        if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 50) {
            setScrollBottom(true)
        } else {
            setScrollBottom(false)
        }
    };

    return (
        <div className={styles.Content}>
            <div className={styles.Categorys}>
                <Category name={name} categorys={categorys} selectedCategory={selectedCategory}
                          setSelectedCategory={setSelectedCategory}/>

                <Select
                    items={statusFilter}
                    selectedKeys={statusFilter}
                    label="Status"
                    placeholder="Select an status"
                    className="max-w-xs"
                    selectionMode="multiple"
                    onSelectionChange={(status) => {
                        setStatusFilter(status)
                    }}
                >
                    {Object.keys(WordStatusNames).map((status: string) => (
                        <SelectItem key={status}>
                            {   // @ts-ignore
                                WordStatusNames[status]
                            }
                        </SelectItem>
                    ))}
                </Select>
            </div>
            {name === 'word' && (
                <div className={styles.Swiper}>
                    <Swiper slidesPerView={'auto'} spaceBetween={5}>
                        {symbols.map(symbol => (
                            <SwiperSlide className={styles.SymbolWrapper} key={symbol}
                                         onClick={() => {
                                             setFilterValue('');
                                             setFilterSymbol(symbol === filterSymbol ? '' : symbol);
                                         }}><span
                                className={clsx(filterSymbol === symbol && styles.SymbolActive, styles.Symbol)}>{symbol}</span></SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
            <div className="flex justify-center">
                <Input
                    isClearable
                    classNames={{
                        base: "w-full sm:max-w-[40%]",
                        inputWrapper: "border-1",
                    }}
                    placeholder="Search"
                    variant="bordered"
                    value={filterValue}
                    onClear={() => {
                        setFilterValue("");
                        setPage(1)
                    }}
                    onValueChange={(value) => {
                        if (value) {
                            setFilterValue(value.toLowerCase());
                            setFilterSymbol("");
                            setPage(1);
                        } else {
                            setFilterValue("");
                        }
                    }}
                />
            </div>
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">Total: {itemsFiltered?.length}</span>

                <span
                    className="text-default-400 text-small">Sort: {sorts.map(sort => (
                    <span
                        key={sort}
                        className={clsx(styles.SortItem, sortItem === sort && styles.SortItemActive, sortDirection === 'asc' ? styles.SortItemAsc : styles.SortItemDesc)}
                        onClick={() => {
                            setSortItem(sort);
                            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
                        }}
                    >{sort}</span>
                ))}</span>
            </div>

            <div className={styles.Table}>
                {tableHead}
                {wordsFilteredPaged?.map((item: any) => tableBodyItem(item))}
            </div>

            {!filterValue && (
                <div className={styles.Bottom}>
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={itemsFiltered.length > rowsPerPage ? Math.ceil(itemsFiltered.length / rowsPerPage) : 1}
                        onChange={(page) => setPage(page)}
                    />

                    <div className="flex items-center text-default-400 gap-2 text-small">
                        <label>Rows per page:</label>

                        <Select
                            defaultSelectedKeys={[20]}
                            className="max-w-xs"
                            onChange={(rowsPerPage) => {
                                onRowsPerPageChange(rowsPerPage.target.value)
                            }}
                        >
                            <SelectItem key={20}>20</SelectItem>
                            <SelectItem key={50}>50</SelectItem>
                            <SelectItem key={100}>100</SelectItem>
                        </Select>
                    </div>
                </div>
            )}


            {!filterValue && (
                <div className={clsx(scrollBottom && styles.PanelWrapperBottom,styles.PanelWrapper)}>
                    <div className={styles.Panel}>
                        <Button
                            color={isAllSelected ? 'primary' : 'default'}
                            onClick={() => {
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
                            }}>
                            {isAllSelected ? 'Deselect' : 'Select'} all words
                        </Button>
                        {selectedKeyIds.length > 0 && (
                            <Button onClick={async () => {
                                for (const id of selectedKeyIds) {
                                    if (name === 'word') {
                                        await Api.words.update(id, {
                                            status: WordStatuses.Learning,
                                        });
                                    } else {
                                        await Api.sentences.update(id, {
                                            status: WordStatuses.Learning,
                                        });
                                    }
                                }
                                window.location.href = '/learn'
                            }}>Learn {
                                // @ts-ignore
                                selectedKeyIds.length} word{selectedKeyIds.length > 1 && 's'}</Button>)}
                    </div>
                </div>
            )}
        </div>
    )
}
import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useMemo, useState, useCallback, useEffect} from "react";
import {
    Input,
Button,
    Tooltip, Pagination, Select, SelectItem
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

export default function ContentTable({
    name,
    addItemPopupType,
    items,
    categorys,
    handleDeleteItem,
    handleGetItems,
    tableHead,
    tableBodyItem,
    searchTranslatedWord = '',
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
            return {
                ...item,
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
                    return item.categorys.map((categorys: any) => categorys.id).includes(selectedCategory)
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
    const [sortDirection, setSortDirection]: any = useState('asc');
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
                    return sortDirection === 'asc' ?  1 : -1;
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

    const [selectedKeys, setSelectedKeys]: any = useState({});
    const checkbox = (item: any) => <Checkbox isChecked={selectedKeys[item.id]} isReadOnly={true}  onClick={(e: any) => {
        setSelectedKeys({...selectedKeys, [item.id]: !selectedKeys[item.id]})
    }}/>

    const selectedKeyIds: any = useMemo(() => {
        // @ts-ignore
        return Object.keys(selectedKeys).filter((id: number) => selectedKeys[id]) || [];
    }, [selectedKeys])

    const [currentIds, setCurrentIds]: any = useState([]);

    const isAllSelected = useMemo(() => {
        return selectedKeyIds.length === currentIds.length
    }, [selectedKeyIds, currentIds])

    return (
        <div>
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
                                  }}><span className={clsx(filterSymbol === symbol && styles.SymbolActive, styles.Symbol)}>{symbol}</span></SwiperSlide>
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
                {wordsFilteredPaged?.map((item: any) => tableBodyItem(item, actions(item), checkbox(item)))}
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
                <div className={styles.PanelWrapper}>
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
                                    await Api.words.update(id, {
                                        status: WordStatuses.Learning,
                                    });
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
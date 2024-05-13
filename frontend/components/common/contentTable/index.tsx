import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useMemo, useState, useCallback, useEffect} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Tooltip, Pagination
} from "@nextui-org/react";
import {ChevronDownIcon, DeleteIcon, EditIcon} from "@nextui-org/shared-icons";
import {showPopup} from "~/redux/action-creaters/popup";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {DeleteUser} from "~/components/common/detele";
import {WordStatusNames} from "~/types/words/wordFe";
import Category from "./category";
import {EyeIcon} from "~/components/icons/eye";
import {GoogleIcon} from "~/components/icons/google";
import {YandexIcon} from "~/components/icons/yandex";
import {WordStatuses} from "~/types/words/word";
import clsx from "clsx";

export default function ContentTable({
    name,
    addItemPopupType,
    items,
    categorys,
    handleDeleteItem,
    handleGetItems,
    tableHead,
    tableBodyItem,
    setCurrentIds = () => {}
}: any) {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [deleteItem, setDeleteItem]: any = useState(null);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "age",
        direction: "ascending",
    });
    const [filterValue, setFilterValue] = useState("");

    const [statusFilter, setStatusFilter] = useState([]);

    const onRowsPerPageChange = useCallback((e: { target: { value: any; }; }) => {
        setPage(1)
        setRowsPerPage(Number(e.target.value));
    }, []);

    const [rowsPerPage, setRowsPerPage] = useState(20);

    const doDeleteItem = async () => {
        // @ts-ignore
        await handleDeleteItem(deleteItem.id)
        setDeleteItem(null);
        handleGetItems();
    }

    const statusFilterArray = useMemo(() => {
        return [...statusFilter].map(item => +item);
    }, [statusFilter])

    const itemsFiltered = useMemo(() => {
        return items.filter((item: any) => {
            if (!selectedCategory) {
                return true;
            }
            return item.categorys.map((categorys: any) => categorys.id).includes(selectedCategory)
        }).filter((item: any) => {
            return statusFilterArray.length === 0 || statusFilterArray.includes(item.status);
        }).filter((item: any) => !filterValue || item.word?.includes(filterValue) || item.translation?.includes(filterValue) || item.sentence?.includes(filterValue))
    }, [items, selectedCategory, statusFilterArray, filterValue])

    const wordsFilteredPaged = useMemo(() => {
        return itemsFiltered.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
    }, [itemsFiltered, page, rowsPerPage]);

    useEffect(() => {
        setCurrentIds(wordsFilteredPaged.map((item: any) => item.id))
    }, [wordsFilteredPaged]);

    const actions = (item: any) => <>
        <Button variant="light" disableAnimation={true} size="sm"  onClick={(e) => {
            // @ts-ignore
            dispatch(showPopup(addItemPopupType, item));
        }}>
             <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
            </span>
        </Button>
        <Tooltip
            content={
                <DeleteUser
                    name={` item ${deleteItem?.id}`}
                    onDelete={() => {
                        doDeleteItem()
                    }}
                    onCancel={() => {setDeleteItem(null)}}
                />
            }
            placement='top'
            isOpen={deleteItem?.id === item.id ? true : false}
        >
            <Button variant="light" disableAnimation={true} size="sm" onClick={() => {
                setDeleteItem(item);
            }}>
                <div className="text-lg text-danger cursor-pointer active:opacity-50" >
                    <DeleteIcon />
                </div>
            </Button>
        </Tooltip>
    </>

    return (
        <div>
            <div className={styles.Categorys}>
                <Category name={name} categorys={categorys} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
            </div>
            <div className="flex justify-between gap-3 items-end mb-3 flex-col sm:flex-row lg:flex-row">
                <Input
                    isClearable
                    classNames={{
                        base: "w-full sm:max-w-[30%]",
                        inputWrapper: "border-1",
                    }}
                    placeholder="Search"
                    size="sm"
                    variant="bordered"
                    value={filterValue}
                    onClear={() => {
                        setFilterValue("")
                        setPage(1)
                    }}
                    onValueChange={(value) => {
                        if (value) {
                            setFilterValue(value);
                            setPage(1);
                        } else {
                            setFilterValue("");
                        }
                    }}
                />
                {name === 'word' && (
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="sm:flex">
                                <Button
                                    endContent={<ChevronDownIcon className="text-small" />}
                                    size="sm"
                                    variant="flat"
                                >
                                    {statusFilterArray.length === 0 ? `Status` : statusFilterArray.map(statusId => {
                                        // @ts-ignore
                                        return WordStatusNames[statusId]
                                    }).join(', ')}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectionMode="multiple"
                                selectedKeys={statusFilter}
                                // @ts-ignore
                                onSelectionChange={setStatusFilter}
                            >
                                {Object.keys(WordStatusNames).map((status: string) => (
                                    <DropdownItem key={status} className="capitalize">
                                        {   // @ts-ignore
                                            WordStatusNames[status]
                                        }
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button
                            className="bg-foreground text-background"
                            size="sm"
                            onClick={() => {
                                // @ts-ignore
                                dispatch(showPopup(popupTypes.addWord))
                            }}
                        >
                            Add word
                        </Button>
                        <Button
                            className="bg-foreground text-background"
                            size="sm"
                            onClick={() => {
                                // @ts-ignore
                                dispatch(showPopup(popupTypes.addWords))
                            }}
                        >
                            Add multiple words
                        </Button>
                    </div>
                )}
                {name === 'sentence' && (
                    <div className="flex gap-3">

                        <Button
                            className="bg-foreground text-background"
                            size="sm"
                            onClick={() => {
                                // @ts-ignore
                                dispatch(showPopup(popupTypes.addSentence))
                            }}
                        >
                            Add sentence
                        </Button>
                    </div>
                )}
            </div>
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">Total: {itemsFiltered?.length}</span>
                <label className="flex items-center text-default-400 text-small">
                    Rows per page:
                    <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        onChange={onRowsPerPageChange}
                        value={rowsPerPage}
                    >
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="100">100</option>
                    </select>
                </label>
            </div>


            <div>
                {tableHead}
                {wordsFilteredPaged?.map((item: any) => tableBodyItem(item, actions(item)))}
            </div>

            {itemsFiltered.length > rowsPerPage && (
                <div className="flex w-full justify-center mb-10 mt-10">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={Math.ceil(itemsFiltered.length / rowsPerPage)}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            )}
        </div>
    )
}
import styles from './index.module.scss'
import {useDispatch} from "react-redux";
import {useState} from "react";
import {
    Button, Tooltip
} from "@nextui-org/react";
import {DeleteIcon, EditIcon} from "@nextui-org/shared-icons";
import {showPopup} from "~/redux/action-creaters/popup";
import {popupTypes} from "~/redux/reducers/popupReducer";
import {DeleteUser} from "~/components/common/detele";
import {Api} from "~/api";
import {Accordion, AccordionItem} from "@nextui-org/react";
import {getSentenceCategory, getWordCategory} from "~/redux/action-creaters/category";
import {AppDispatch} from "~/redux";

export default function Category({name, categorys, selectedCategory, setSelectedCategory}: any) {
    const dispatch: AppDispatch = useDispatch();
    const [deleteCategory, setDeleteCategory] = useState(null);

    const doDeleteCategory = async () => {
        await Api.categorys.delete(selectedCategory);
        setDeleteCategory(null);
        dispatch(getWordCategory());
        dispatch(getSentenceCategory());
        setSelectedCategory(null);
    }

    return (
        <Accordion variant="splitted" isCompact >
            <AccordionItem title={<div className='flex flex justify-between'>
                <div className={styles.Category}>
                    <div>Category</div>
                    {categorys.find((item:any) => item.id === selectedCategory)?.name  || `All ${name}s`}
                </div>
                {selectedCategory && (
                    <div className={styles.Buttons}>
                        <Button variant="light"  disableAnimation={true} size="sm" className={styles.Button} onClick={(e) => {
                            dispatch(showPopup(popupTypes.addCategory, categorys.find((item: any) => item.id === selectedCategory)))
                        }}>
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" >
                                <EditIcon />
                            </span>
                        </Button>
                        <Tooltip
                            content={
                                <DeleteUser
                                    name={'category'}
                                    onDelete={() => {
                                        doDeleteCategory()
                                    }}
                                    onCancel={() => {setDeleteCategory(null)}}
                                />
                            }
                            placement='top'
                            isOpen={deleteCategory ? true : false}
                        >
                            <Button variant="light" disableAnimation={true} size="sm" className={styles.Button} onClick={() => {
                                setDeleteCategory(selectedCategory);
                            }}>
                                <div className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <DeleteIcon />
                                </div>
                            </Button>
                        </Tooltip>

                    </div>
                )}
            </div>} >
                <div className="flex gap-3 mb-3 flex-wrap">
                    {categorys.map((column: any) => (
                        <Button key={column.uid} color={column.id === selectedCategory ? 'primary' : 'default'} variant='bordered' size="sm" onClick={() => {
                            setSelectedCategory(column.id === selectedCategory ? null : column.id);
                        }}>
                            {(column.name)}
                        </Button>
                    ))}
                    <Button size="sm" onClick={() => {
                        dispatch(showPopup(popupTypes.addCategory, {type: name === 'word' ? 1 : 2}))
                    }}>
                        Add new category
                    </Button>
                </div>
            </AccordionItem>
        </Accordion>
    )
}
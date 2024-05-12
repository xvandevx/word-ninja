import styles from './index.module.scss'
import clsx from "clsx";

export default function Checkbox({onChange, isChecked, label}: any) {
    return (
        <div
            className={styles.Checkbox}
            onClick={onChange}>
            <span className={clsx(styles.Box, isChecked && styles.BoxChecked)}/>
            {label && <span>{label}</span>}
        </div>
    )
}

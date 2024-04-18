import styles from './index.module.scss'
import InputMask from 'react-input-mask';
import clsx from "clsx";

export default function Input({
    label,
    value,
    after,
    right,
    placeholder,
    required = false,
    isMultiple,
    onChange = () => {},
    onBlur = () => {},
    onClick,
    isError,
    error = '',
    disabled,
    classProp
}: any) {
    return (
        <div
            onClick={onClick}
            className={clsx(styles.Input, classProp, disabled && styles.Disabled, isError && styles.Error)}
        >
            <label>{label}{required && '*'}</label>
            <div className={styles.Content}>
                {disabled ? (<div>{value}</div>) : (isMultiple ? (
                    <textarea
                        // @ts-ignore
                        onChange={event => onChange(event.target.value)}
                        // @ts-ignore
                        placeholder={placeholder}
                    >{value}</textarea>
                ) : (
                    // @ts-ignore
                    <input
                        placeholder={placeholder}
                        onChange={(event: any) => onChange(event.target.value)}
                        onBlur={(event: any) => onBlur(event.target.value)}
                        value={value}
                    />
                ))}
                {right && <span className={styles.Right}>{right}</span>}
            </div>
            {error && <span className={styles.Error}>{error ?? 'Заполните поле'}</span>}
            {after && <span className={styles.After}>{after}</span>}
        </div>
    )
}

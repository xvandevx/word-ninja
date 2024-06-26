import styles from './index.module.scss'
import clsx from "clsx";

export default function Button({children, type = '', onClick = () => {}, before, after, backgroundColor, customStyles, isDisabled, isLoading}: any) {
    return (
        <div className={clsx(
            styles.Button,
            customStyles,
            isDisabled && styles.Disabled,
            type === '' && styles.Default,
            type === 'black' && styles.Black,
            type === 'blackSelected' && styles.BlackSelected,
            type === 'outline' && styles.Outline,
            type === 'outlineGray' && styles.OutlineGray,
            type === 'outlineWhite' && styles.OutlineWhite,
            type === 'none' && styles.None,
        )}
        style={{
            backgroundColor: backgroundColor,
            borderColor: backgroundColor,
        }}
        onClick={function (e) {
            if (!isDisabled && !isLoading) {
                e.nativeEvent.preventDefault()
                e.stopPropagation()
                onClick()
            }
        }}>
            {isLoading && (
                <span className={styles.Loader}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
                        <path d="M25,5A20.14,20.14,0,0,1,45,22.88a2.51,2.51,0,0,0,2.49,2.26h0A2.52,2.52,0,0,0,50,22.33a25.14,25.14,0,0,0-50,0,2.52,2.52,0,0,0,2.5,2.81h0A2.51,2.51,0,0,0,5,22.88,20.14,20.14,0,0,1,25,5Z">
                            <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.5s" repeatCount="indefinite"/>
                        </path>
                    </svg>
                </span>
            )}
            {!isLoading && (<>
                {before}{children && (<span>{children}</span>)}{after}</>
            )}
        </div>
    )
}

import styles from './index.module.scss'

export default function Table({items}) {
    return (
        <div className={styles.Table}>
            <span className={styles.Head}>Word</span>
            <span className={styles.Head}>Translation</span>
            {items.map(word => (
                <>
                    <span>{word.name}</span>
                    <span>{word.translation}</span>
                </>
            ))}
        </div>
    )
}
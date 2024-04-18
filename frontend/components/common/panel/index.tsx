import styles from './index.module.scss'

export default function Panel({links}) {
    return (
        <div className={styles.Panel}>
            <div className={styles.Links}>
                {links.map((link: any) => (
                    <span key={link.name} onClick={() => {
                        link.action()
                    }}>{link.name}</span>
                ))}
            </div>
        </div>
    )
}
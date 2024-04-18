import React, {useState} from 'react';
import styles from './index.module.scss'

export default function Side({children, side}: any) {
    return (
        <div className={styles.Block}>
            <div className={styles.Side}>{side}</div>
            <div className={styles.Content}>{children}</div>
        </div>
    );
};
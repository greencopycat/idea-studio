import React from 'react'
import styles from './Overlay.module.css';

const Overlay = (props) => {
    const loadingText = props.text | 'Loading...'
    return (
        <div className={styles.overlay}>{loadingText}</div>
    )
}

export default Overlay

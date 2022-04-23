import React from 'react'
import * as styles from './Overlay.module.scss';

const Overlay = (props) => {
    const loadingText = props.text | 'Loading...'
    return (
        <div className={styles.overlay}>{loadingText}</div>
    )
}

export default Overlay

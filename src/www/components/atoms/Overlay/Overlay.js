import React from 'react'
import PropTypes from 'prop-types'

import styles from './Overlay.module.css';

const Overlay = (props) => {
    const loadingText = props.text
    const classes = [styles.overlay]
    props.open && (classes.push(styles.open))
    return (
        <div className={classes.join(' ')}>{props.children}{loadingText}</div>
    )
}

Overlay.propTypes = {
    open: PropTypes.bool,
    text: PropTypes.string
}

export default Overlay

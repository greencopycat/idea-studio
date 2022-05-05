import React from 'react'
import PropTypes from 'prop-types'

import styles from './Modal.module.css'

const Modal = (props) => {
    const classes = [styles.wrapper]
    const content = (
        <dialog className={classes.join(' ')}>
            <h1>{props.heading}</h1>
            <div>
                {props.text}
            </div>
        </dialog>
    )
    const active = props.open ? 'true' : 'false'
    return (
        <dialog open={active}>
            {content}
        </dialog>
    )
}

Modal.propTypes = {
    type: PropTypes.string,
    heading: PropTypes.string,
    text: PropTypes.string.isRequired,
    open: PropTypes.bool,
    events: PropTypes.arrayOf(PropTypes.func)
}

export default Modal
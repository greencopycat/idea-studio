import React from 'react'
import PropTypes from 'prop-types'

import Overlay from './../Overlay'

import styles from './Modal.module.css'

const Modal = (props) => {
    const classes = [styles.wrapper]
    const content = (
        <>
            <h2>{props.heading}</h2>
            <div className={`mar-b25`}>
                {props.text}
            </div>
        </>
    )
    return (
        <Overlay open={props.open}>
            <dialog className={classes.join(' ')} open={props.open}>
                {content}
                <button onClick={props.events.confirm}>Yes</button>
                <button onClick={props.events.cancel}>No</button>
            </dialog>
        </Overlay>
    )
}

Modal.propTypes = {
    type: PropTypes.string,
    heading: PropTypes.string,
    text: PropTypes.string.isRequired,
    open: PropTypes.bool,
    events: PropTypes.objectOf(PropTypes.func)
}

export default Modal
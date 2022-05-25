import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Overlay from './../Overlay'
import Row from './../../Layout/Row'
import Button from './../Button'

import styles from './Modal.module.css'

const Modal = (props) => {
    const classes = [styles.wrapper]

    useEffect(() => {
        if(window) {
            window.addEventListener('keydown', (evt) => {
                evt.preventDefault()
                if (evt.key === 'Escape' || evt.keyCode === 27) {
                    props.events.cancel()
                }
            }, { once: true })
        }
    }, [props])

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
                <Row>
                    <Button onclick={props.events.confirm} text={`Yes`} theme={`modal`} />
                    <Button onclick={props.events.cancel} text={`No`} theme={`modal`} />
                </Row>
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
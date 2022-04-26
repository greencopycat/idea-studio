import React from 'react'
import PropTypes from 'prop-types'

// Components
import Button from './../Button'
import CheckBox from './../CheckBox'
import Dropdown from './../Dropdown'
import InputBox from './../InputBox'
import RadioBox from './../RadioBox'
import Text from './../Text'

// Styles
import * as styles from './Field.module.css'

const propForFields = {
    BUTTON: ['type', 'label', 'callbacks', 'text', 'callbacks'],
    CHECKBOX: [],
    DROPDOWN: ['label'],
    INPUTBOX: ['type', 'text', 'label', 'placeholder', 'callbacks', 'id', 'name', 'disabled', 'pattern', 'accept'],
    RADIOBOX: []
}

const getProps = (des, propNames, props) => {
    propNames.forEach((ea) => {
        if (props[ea]) {
            if (ea === 'callbacks') {
                Object.keys(props[ea]).forEach((cb) => {
                    des[cb] = props[ea][cb]
                })
            } else {
                des[ea] = props[ea]
            }
        }
    })
    console.log('[props] -> ', des)
    return des
}

const Field = (props) => {
    let Component
    let fieldProps = {}
    if (props.type) {
        const elem = props.elem.toUpperCase()
        switch(elem) {
            case 'BUTTON': 
                Component = Button
                break
            case 'CHECKBOX':
                Component = CheckBox
                break
            case 'DROPDOWN':
                Component = Dropdown
                break
            case 'INPUTBOX':
                Component = InputBox
                break
            case 'RADIOBOX': 
                Component = RadioBox
                break
            default:
                break
        }
        fieldProps = getProps({}, propForFields[elem], props)
    }
    const classes = [props.elem.toUpperCase() !== 'BUTTON' ? styles.field : ''].join(' ')
    return (
        <div className={classes}>
            {props.label ? <Text elem={`label`} value={props.label} /> : null}
            {Component && <Component {...fieldProps} />}
        </div>
    )
}

Field.propTypes = {
    accept: PropTypes.string,
    callbacks: PropTypes.objectOf(PropTypes.func),
    disabled: PropTypes.bool,
    download: PropTypes.bool,
    elem: PropTypes.oneOf(['button', 'checkbox', 'dropdown', 'inputbox', 'radiobox']),
    id: PropTypes.string,
    label: PropTypes.string,
    maxlength: PropTypes.number,
    name: PropTypes.string,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    require: PropTypes.bool,
    text: PropTypes.string,
    type: PropTypes.string,
}

export default Field
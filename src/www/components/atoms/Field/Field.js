import React from 'react'
import PropTypes from 'prop-types'

// Components
import Button from './../Button'
import CheckBox from './../CheckBox'
import Dropdown from './../Dropdown'
import InputBox from './../InputBox'
import RadioBox from './../RadioBox'
import TextBox from './../TextBox'
import Text from './../Text'
import Tags from './../Tags'

// Styles
import styles from './Field.module.css'

const propForFields = {
    BUTTON: ['type', 'label', 'callbacks', 'text', 'callbacks', 'disabled', 'classes', 'icon'],
    CHECKBOX: [],
    DROPDOWN: ['label'],
    INPUTBOX: ['type', 'text', 'label', 'placeholder', 'callbacks', 'id', 'name', 'disabled', 'pattern', 'accept', 'classes', 'data', 'input', 'formField'],
    RADIOBOX: [],
    TEXTBOX: ['input', 'classes', 'id', 'name', 'disabled', 'callbacks', 'formField'],
    TAGS: ['input', 'classes', 'id', 'name', 'callbacks'],
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
    if (des.type === 'file') {
        des[`multiple`] = true
    }
    return des
}

const Field = (props) => {
    let Component
    let fieldProps = {}
    const wrapperClasses = []
    if (props.display) {
        switch(props.display) {
            case 'inline': 
                wrapperClasses.push('inline')
                break
            case 'block':
                wrapperClasses.push('block')
                break
            case 'inline-block':
                wrapperClasses.push('inline-block')
                break
            default:
                break
        }
    }
    if (props.wrapperClasses) {
        const wrapper = props.wrapperClasses.split(' ')
        wrapperClasses.push(wrapper)
    }
    if (props.elem) {
        const elem = props.elem.toUpperCase()
        switch(elem) {
            case 'BUTTON': 
                Component = Button
                break
            case 'CHECKBOX':
                Component = CheckBox
                props.formField && wrapperClasses.push(styles.field)
                break
            case 'DROPDOWN':
                Component = Dropdown
                props.formField && wrapperClasses.push(styles.field)
                break
            case 'INPUTBOX':
                Component = InputBox
                props.formField && wrapperClasses.push(styles.field)
                break
            case 'RADIOBOX': 
                Component = RadioBox
                props.formField && wrapperClasses.push(styles.field)
                break
            case 'TEXTBOX': 
                Component = TextBox
                break
            case 'TAGS':
                Component = Tags
                break
            default:
                break
        }
        fieldProps = getProps({}, propForFields[elem], props)
    }
    return (
        <div className={wrapperClasses.join(' ')}>
            {props.label ? <Text elem={`label`} classes={`${props.formField ? 'uppercase strong': ''}`} value={props.label} /> : null}
            {Component && <Component {...fieldProps} />}
        </div>
    )
}

Field.propTypes = {
    accept: PropTypes.string,
    callbacks: PropTypes.objectOf(PropTypes.func),
    classes: PropTypes.string,
    data: PropTypes.object,
    disabled: PropTypes.bool,
    display: PropTypes.oneOf(['inline', 'block', 'inline-block']),
    download: PropTypes.bool,
    elem: PropTypes.oneOf(['button', 'checkbox', 'dropdown', 'inputbox', 'radiobox', 'textbox', 'tags']),
    icon: PropTypes.oneOf(['del', 'mod']),
    id: PropTypes.string,
    input: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    label: PropTypes.string,
    maxlength: PropTypes.number,
    name: PropTypes.string,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    require: PropTypes.bool,
    text: PropTypes.string,
    type: PropTypes.string,
    formField: PropTypes.bool,
    wrapperClasses: PropTypes.string,
}

export default Field
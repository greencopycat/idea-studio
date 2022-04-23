import React from 'react'
import PropTypes from 'prop-types'

// Components
import Button from './../Button'
import CheckBox from './../CheckBox'
import Dropdown from './../Dropdown'
import InputBox from './../InputBox'
import RadioBox from './../RadioBox'

const propForFields = {
    BUTTON: [],
    CHECKBOX: [],
    DROPDOWN: ['label'],
    INPUTBOX: [],
    RADIOBOX: []
}

const getProps = (des, propNames, props) => {
    propNames.forEach((ea) => {
        if (props[ea]) {
            des[ea] = props[ea]
        }
    })
    return des
}

const Field = (props) => {
    let Component
    let fieldProps = {}
    if (props.type) {
        const fieldType = props.type.toUpperCase()
        switch(fieldType) {
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
        fieldProps = getProps({}, propForFields[fieldType], props)
    }
    return (
        <>
            {Component && <Component {...fieldProps} />}
        </>
    )
}

Field.propTypes = {
    type: PropTypes.oneOf(['button', 'checkbox', 'dropdown', 'inputbox', 'radiobox']),
    label: PropTypes.string
}

export default Field
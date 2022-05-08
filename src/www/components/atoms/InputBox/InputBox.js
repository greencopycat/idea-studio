import React, { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'

import styles from './InputBox.module.css'

const InputBox = (props) => {
    // value, pattern, type, placeholder
    const [value, setValue] = useReducer((s,v) => v, '')
    const events = {
        onBlur: props.onBlur,
        onChange: props.onChange,
        onClick: props.onClick,
    }
    
    useEffect(() => {
        props.input && setValue(props.input)
    })

    const classes = ['font-regular', styles.wrapper]
    if (props.classes) {
        const cls = props.classes.split(' ')
        classes.push(...cls)
    }
    if (props.formField) {
        classes.push(styles.field)
    }
    return (
        <>
            <input 
                accept={props.accept}
                className={classes.join(' ')}
                disabled={props.disabled}
                download={props.download}
                {...events} 
                id={props.id}
                name={props.name}
                pattern={props.pattern}
                placeholder={props.placeholder} 
                type={props.type !== 'tag' ? props.type : null} 
                multiple={props.multiple}
                defaultValue={value}
                {...props.data}
            />
        </>
    )
}

InputBox.propTypes = {
    accept: PropTypes.string,
    classes: PropTypes.string,
    data: PropTypes.object,
    disabled: PropTypes.bool,
    download: PropTypes.bool,
    formField: PropTypes.bool,
    id: PropTypes.string,
    input: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    row: PropTypes.number,
    type: PropTypes.string
}

export default InputBox
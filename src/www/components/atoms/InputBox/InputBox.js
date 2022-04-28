import React from 'react'
import PropTypes from 'prop-types'

import styles from './InputBox.module.css'

const InputBox = (props) => {
    // value, pattern, type, placeholder
    const events = {
        onBlur: props.onBlur,
        onChange: props.onChange,
        onClick: props.onClick,
    }

    const classes = ['font-regular', styles.wrapper]
    if (props.classes) {
        const cls = props.classes.split(' ')
        classes.concat(cls)
    }
    // if (props.call)
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
                type={props.type} 
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
    // events: PropTypes.objectOf(PropTypes.func),
    id: PropTypes.string,
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
import React from 'react'
import PropTypes from 'prop-types'

import styles from './TextBox.module.css'

const TextBox = (props) => {
    const classes = [styles.wrapper]
    if (props.classes) {
        const propClass = props.classes.split(' ')
        classes.push(...propClass)
    }
    if (props.formField) {
        classes.push(styles.field)
    }
    return (
        <textarea 
            className={classes.join(' ')}
            defaultValue={props.input}
            disabled={props.disabled}
        />
    )
}

TextBox.propTypes = {
    callbacks: PropTypes.objectOf(PropTypes.func),
    classes: PropTypes.string,
    disabled: PropTypes.bool,
    formField: PropTypes.bool,
    id: PropTypes.string,
    input: PropTypes.string,
    name: PropTypes.string,
}

export default TextBox
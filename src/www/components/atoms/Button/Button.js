import React from 'react'
import PropTypes from 'prop-types'

import styles from './Button.module.css'

const Button = (props) => {
    const classes = [styles.wrapper, 'font-regular']
    const events = {
        onClick: props.onClick
    }
    return (
        <button className={classes.join(' ')} type={props.buttonType || 'button'} {...events} >{props.text}</button>
    )
}

Button.propTypes = {
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    onclick: PropTypes.func,
}

export default Button
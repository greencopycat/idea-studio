import React from 'react'
import PropTypes from 'prop-types'

import styles from './Button.module.css'

const Button = (props) => {
    const classes = [styles.wrapper, 'font-regular']
    props.icon && classes.push(styles.icon)
    const icon = props.icon
    const events = {
        onClick: props.onClick
    }
    return (
        <button className={classes.join(' ')} type={props.buttonType || 'button'} {...events} disabled={props.disabled}>{icon}{props.text}</button>
    )
}

Button.propTypes = {
    disabled: PropTypes.bool,
    icon: PropTypes.oneOf(['mod', 'del']),
    onclick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

export default Button
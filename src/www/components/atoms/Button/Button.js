import React from 'react'
import PropTypes from 'prop-types'

import styles from './Button.module.css'

import svgIcons from '../../../assets/react-svg'

const Button = (props) => {
    const defaultClass = props.type === 'tag' ? styles.tag : styles.wrapper
    const classes = [defaultClass, 'font-regular']
    props.icon && classes.push(styles.icon)
    const icon = props.icon
    const events = {
        onClick: props.onClick
    }
    let svgIcon
    let title
    if(icon === 'mod') {
        svgIcon = svgIcons.svgModify
        title = 'Edit'
    } else 
    if(icon === 'del') {
        svgIcon = svgIcons.svgDelete
        title = 'Delete'
    }
    return (
        <button title={title} className={classes.join(' ')} type={props.buttonType || 'button'} {...events} disabled={props.disabled}>{svgIcon}{props.text}</button>
    )
}

Button.propTypes = {
    disabled: PropTypes.bool,
    icon: PropTypes.oneOf(['mod', 'del']),
    onclick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset', 'tag']),
}

export default Button
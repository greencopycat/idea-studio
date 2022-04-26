import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) => {
    const events = {
        onClick: props.onClick
    }
    return (
        <button type={props.buttonType || 'button'} {...events} >{props.text}</button>
    )
}

Button.propTypes = {
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    onclick: PropTypes.func,
}

export default Button
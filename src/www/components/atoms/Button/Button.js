import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) => {
    return (
        <button type="button">text</button>
    )
}

Button.propTypes = {
    type: PropTypes.oneOf(['button', 'submit', 'reset'])
}

export default Button
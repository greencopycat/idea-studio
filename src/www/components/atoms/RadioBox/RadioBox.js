import React from 'react'
import PropTypes from 'prop-types'

const RadioBox = (props) => {
    return (
        <input type={`radio`} />
    )
}

RadioBox.propTypes = {
    text: PropTypes.string
}

export default RadioBox
import React from 'react'
import PropTypes from 'prop-types'

import svgIcons from './../../../assets/react-svg/'

const Icon = (props) => {
    const name = props.name
    let icon = svgIcons[name]
    return (
        {icon}
    )
}

Icon.propTypes = {
    name: PropTypes.oneOf(['del', 'mod'])
}

export default Icon
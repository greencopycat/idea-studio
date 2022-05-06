import React from 'react'
import PropTypes from 'prop-types'

import SVG from './../../../constant/icons'

const Icon = (props) => {
    const name = props.name
    let icon = SVG[name]
    return (
        {icon}
    )
}

Icon.propTypes = {
    name: PropTypes.oneOf(['del', 'mod'])
}

export default Icon
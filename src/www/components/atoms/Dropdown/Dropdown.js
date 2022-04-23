import React from 'react'
import PropTypes from 'prop-types'

const Dropdown = (props) => {
    return (
        <>
            <label>{props.label}</label>
            <select><option>1</option></select>
        </>
    )
}

Dropdown.propTypes = {
    label: PropTypes.string
}

export default Dropdown
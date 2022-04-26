import React from 'react'
import PropTypes from 'prop-types'

const Row = (props) => {
    let col = props.columns | (12 / props.children.length)
    const classes = ['col-' + col].join(' ')
    return (
        <div className={classes}>
            {props.children}
        </div>
    )
}

Row.propTypes = {
    columns: PropTypes.number
}
export default Row
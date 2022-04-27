import React from 'react'
import PropTypes from 'prop-types'

const Row = (props) => {
    let cols;
    cols = 'col-' + (props.columns ? props.columns : (12 / (props.children.length || 1)))
    const classes = [cols]
    let cls = []
    props.classes && (cls = props.classes.split(' '))
    cls.forEach((ea) => classes.push(ea))
    return (
        <div className={classes.join(' ')}>
            {props.children}
        </div>
    )
}

Row.propTypes = {
    classes: PropTypes.string,
    columns: PropTypes.number
}
export default Row
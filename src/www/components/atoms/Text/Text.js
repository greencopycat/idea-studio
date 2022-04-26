import React from 'react'
import PropTypes from 'prop-types'

const Text = (props) => {
    const elem = props.elem
    /* 
     * Types -
     *  label
     *  description
     *  finePrint
     *  default (regular)
     *  error
     *  popup
     *  heading-main
     *  heading-sub
     *  heading-section
     *  heading-category
     *  list
     */
    let MyText = <div />
    switch(elem) {
        case 'label':
            MyText = <label>{props.value}</label>
            break
        default: 
            break
    }

    // set styles here
    return (
        <>{MyText}</>
    )
}

Text.propTypes = {
    elem: PropTypes.oneOf(['label', 'heading', 'error', 'default', 'description', 'eyebrow']),
    level: PropTypes.number,
    value: PropTypes.string
}

export default Text
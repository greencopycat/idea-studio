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
    const classes = [`font-regular`]

    props.classes && props.classes.split(' ').forEach((cls) => classes.push(cls))

    if(props.display) {
        switch(props.display) {
            case 'inline':
                classes.push('inline')
                break
            case 'block':
                classes.push('block')
                break
            case 'inline-block':
                classes.push('inline-block')
                break
            default: 
                break
        }
    }
    switch(elem) {
        case 'heading': 
            MyText = <div role="heading" aria-level={props.level} className={`heading-${props.level}`}>{props.value}</div>
            break
        case 'label':
            MyText = <label className={classes.join(' ')}>{props.value}</label>
            break
        case 'description':
            classes.push('italic')
            MyText = <p className={classes.join(' ')}>{props.value}</p>
            break
        case 'default':
            classes.push('font-regular')
            MyText = <div className={classes.join(' ')}>{props.value}</div>
            break
        default: 
        classes.push('font-regular')
        MyText = <div className={classes.join(' ')}>{props.value}</div>
            break
    }

    // set styles here
    return (
        <>{MyText}</>
    )
}

Text.propTypes = {
    classes: PropTypes.string,
    display: PropTypes.oneOf(['inline', 'block', 'inline-block']),
    elem: PropTypes.oneOf(['label', 'heading', 'error', 'default', 'description', 'eyebrow']),
    level: PropTypes.number,
    value: PropTypes.string,
}

export default Text
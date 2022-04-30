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


    const symbol = (str) => {
        if (str.match(/^&.*;$/)) {
            return <span dangerouslySetInnerHTML={{__html: str}} />
        } else {
            return str
        }
    }

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

    // const index = props.value.search(regex)
    // const symbol = props.value.substring(index).split(';').shift()
    // console.log('[srch] -> ', substring)
    let val = props.value
    const regex = new RegExp(/&.*;/)
    const ind = val.search(regex)
    let sym
    let aa = ''
    let ac = ''
    if (ind > -1) {
        aa = val.substring(0, ind-1)
        const [b, c] = val.substring(ind).split(';')
        ac = c
        sym = <span dangerouslySetInnerHTML={{ __html: b + ';'}} />
        val = <>{aa} {sym} {ac}</>
    } 
    switch(elem) {
        case 'heading': 
            MyText = <div role="heading" aria-level={props.level} className={`heading-${props.level}`}>{val}</div>
            break
        case 'label':
            MyText = <label className={classes.join(' ')}>{val}</label>
            break
        case 'description':
            classes.push('italic')
            MyText = <p className={classes.join(' ')}>{val}</p>
            break
        case 'paragraph': 
            classes.push.apply(classes, ['pad-0', 'mar-0'])
            MyText = <p className={classes.join(' ')}>{val}</p> 
            break
        case 'default':
            classes.push('font-regular')
            MyText = <div className={classes.join(' ')}>{val}</div>
            break
        default: 
        classes.push('font-regular')
        MyText = <div className={classes.join(' ')}>{val}</div>
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
    elem: PropTypes.oneOf(['label', 'heading', 'error', 'default', 'description', 'eyebrow', 'paragraph']),
    level: PropTypes.number,
    value: PropTypes.string,
}

export default Text
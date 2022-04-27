import React from 'react'
import PropTypes from 'prop-types'

import styles from './Link.module.css'

const Link = (props) => {
    const classes = ['font-regular', styles.wrapper]
    return (
        <a className={classes.join(' ')} href={props.url} download={props.download} target={`_blank`}>{props.text}</a>
    )
}

Link.propTypes = {
    download: PropTypes.bool,
    target: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string,
}

export default Link
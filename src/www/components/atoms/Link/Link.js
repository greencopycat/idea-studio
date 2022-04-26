import React from 'react'
import { Link as ALink} from 'react-router-dom'
import PropTypes from 'prop-types'

const Link = (props) => {
    console.log('[link] -> ', props.url)
    return (
        <a href={props.url} download={props.download} target={`_blank`}>{props.text}</a>
    )
}

Link.propTypes = {
    download: PropTypes.bool,
    target: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string,
}

export default Link
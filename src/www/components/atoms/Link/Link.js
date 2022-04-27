import React from 'react'
import PropTypes from 'prop-types'

const Link = (props) => {
    return (
        <a className={`font-regular`} href={props.url} download={props.download} target={`_blank`}>{props.text}</a>
    )
}

Link.propTypes = {
    download: PropTypes.bool,
    target: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string,
}

export default Link
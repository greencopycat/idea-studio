import React from 'react'
import PropTypes from 'prop-types'
import styles from './Footer.module.css'

import Text from './../../atoms/Text'

const Footer = (props) => {
    const copyright = props.feed.copyright
    const classes = [styles.wrapper, 'text-center']
    return (
        <div className={classes.join(' ')}>
            {copyright ? <Text elem={`paragraph`} value={`Copyright &copy; ${copyright.year} ${copyright.company}. Alright reserved.`} /> : null }
        </div>
    )
}

Footer.propTypes = {
    feed: PropTypes.object
}

export default Footer
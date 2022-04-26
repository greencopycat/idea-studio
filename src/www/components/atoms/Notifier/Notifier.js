import React from 'react'
import PropTyes from 'prop-types'
import * as styles from './Notifier.module.css'

const Notifier = (props) => {
    const classes = [styles.notifier].join(' ')
    return (
        <div className={classes}>
            {props.message}
        </div>
    )
}

Notifier.propTypes = {
    message: PropTyes.string,
}

export default Notifier
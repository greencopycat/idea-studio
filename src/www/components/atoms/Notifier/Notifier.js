import React from 'react'
import PropTyes from 'prop-types'
import styles from './Notifier.module.css'

const Notifier = (props) => {
    const classes = [styles.notifier, 'font-regular']
    return (
        <div className={classes.join(' ')}>
            {props.message}
        </div>
    )
}

Notifier.propTypes = {
    message: PropTyes.string,
}

export default Notifier
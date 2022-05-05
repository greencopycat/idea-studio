import React, { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'

import styles from './Accordion.module.css'

const Accordion = (props) => {
    const classes = [styles.wrapper]
    return (
        <details className={classes.join(' ')}>
            <summary>{props.summary}</summary>
            <p>{props.details}</p>
        </details>
    )
}

Accordion.propTypes = {
    summary: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired
}

export default Accordion
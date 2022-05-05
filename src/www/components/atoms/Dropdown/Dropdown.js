import React from 'react'
import PropTypes from 'prop-types'

import styles from './Dropdown.module.css'

const Dropdown = (props) => {
    const classes = [styles.wrapper]
    props.classes && classes.push(...props.classes.replace(/\/s/ig, '').split(' '))
    const optPrp = props.options || []
    const options = optPrp.map((ea, i) => {
        return <option key={ea.value.substring(0, 3) + i} value={ea.value} default={ea.default}>
            {ea.text}
        </option>
    })
    return (
        <>
            {props.label ? <label>{props.label}</label> : null}
            <select className={classes.join(' ')} onChange={props.onSelect}>
                {options}
            </select>
        </>
    )
}

const Option = {
    text: PropTypes.string,
    value: PropTypes.string,
    default: PropTypes.bool
}

Dropdown.propTypes = {
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelect: PropTypes.func.isRequired
}

export default Dropdown
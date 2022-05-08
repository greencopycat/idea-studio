import React from 'react'
import PropTypes from 'prop-types'

import styles from './Tags.module.css'
import Button from './../Button'
import InputBox from './../InputBox'

const Tags = (props) => {
    const tags = props.input
    return (
        <>
            <ul>
                {tags && tags.map((t) => {
                    return (
                        <li className={`inline-block mar-l15`} key={t} name={t}>
                            <Button type={`tag`} text={t} />
                        </li>
                    )
                })}
                <li className={`inline-block mar-l15`}>
                    <InputBox 
                        classes={`pad-10`}
                        placeholder={`Add new tag`}
                        type={`tag`}
                    />
                </li>
            </ul>
        </>
    )
}

Tags.propTypes = {
    input: PropTypes.array
}

export default Tags
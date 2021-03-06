import React, { useContext } from 'react'
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
                        <li className={`inline-block mar-l15 mar-b10`} key={t} name={t}>
                            <Button 
                                type={`tag`} 
                                text={t} 
                                onClick={props.onClick} 
                            />
                        </li>
                    )
                })}
                <li className={`inline-block mar-l15`}>
                    <InputBox 
                        classes={`pad-10`}
                        placeholder={`New tag`}
                        type={`tag`}
                        formField={true}
                        onKeyUp={props.onKeyUp}
                    />
                </li>
            </ul>
        </>
    )
}

Tags.propTypes = {
    input: PropTypes.array,
    onClick: PropTypes.func.isRequired,
    onKeyUp: PropTypes.func.isRequired
}

export default Tags
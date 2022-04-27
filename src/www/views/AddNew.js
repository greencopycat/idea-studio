import React, { useReducer, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Wrapper from './../components/Layout/Wrapper'
import Panel from './../components/Layout/Panel'
import Row from './../components/Layout/Row'
import Text from './../components/atoms/Text'
import Table from './../components/atoms/Table'
import Field from './../components/atoms/Field'

import { FIELDS } from './../components/atoms/Table'
import MS from '../services/microservices'
import { IDEA_ADD } from './../constant/constant'

const AddNew = (props) => {
    const [arr, setArray] = useReducer((state, value) => value, [])
    const [update, forceUpdate] = useState(false)

    const addRow = (arr) => {
        const row = {}
        const newArr = arr
        const len = arr.length
        FIELDS.forEach((f) => {
            row[f.name] = <Field elem={`inputbox`} type={`text`} name={f.name + "_row_" + (len + 1)} />
        })
        newArr.push(row)
        setArray(newArr)
        forceUpdate(!update)
    }

    const removeRow = (arr) => {
        const newArr = arr
        if (newArr.length > 1) {
            newArr.pop()
            setArray(newArr)
            forceUpdate(!update)
        }
    }

    if (!arr.length) {
        addRow(arr)
    }
    return (
        <Wrapper>
            <Panel>
                <Text elem={`heading`} level={1} value={`Add new items`} />
                <Text elem={`default`} classes={`mar-b25`} value={`Make your idea counts`} />
                <Table data={{ideas: arr}} page={`addnew`} />
                <Row>
                    <Field elem={`button`} text={`Add row`} type={`submit`}
                        callbacks={{
                            onClick: ((evt) => {
                                addRow(arr)
                            })
                        }} 
                    />
                    <Field elem={`button`} text={`Remove row`} type={`submit`}
                        callbacks={{
                            onClick: ((evt) => {
                                removeRow(arr)
                            })
                        }}
                        disabled={(arr.length < 2)}
                    />
                    <Field elem={`button`} text={`Submit`} type={`submit`}
                        callbacks={{
                            onClick: ((evt) => {
                                // MS.post()
                            })
                        }}
                        disabled={true}
                    />
                </Row>
            </Panel>
        </Wrapper>
    )
}

AddNew.propTypes = {
    heading: PropTypes.string,
    copy: PropTypes.string
}

export default AddNew
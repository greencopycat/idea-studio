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
import { ENDPOINT, IDEA_ADD } from './../constant/constant'

const AddNew = (props) => {
    let timeout
    const [arr, setArray] = useReducer((state, value) => value, [])
    const [formdata, setFormData] = useReducer((state, value) => {
        if (value) {
            const {row, field, val} = value
            const data = state
            if (val) {
                data[row][field] = val
            }
            return [...data]
        } else {
            return []
        }
    }, [])
    const [update, forceUpdate] = useState(false)

    const addRow = (arr) => {
        const row = new Object({})
        const newArr = arr 
        const len = arr.length
        FIELDS.forEach((f) => {
            row[f.name] = <Field elem={`inputbox`} type={`text`} name={f.name + "_row_" + (len + 1)} 
                callbacks={{
                    onChange: (evt) => {
                        const $tar = evt.currentTarget
                        const row = $tar.getAttribute('row')
                        const field = $tar.getAttribute('field')
                        clearTimeout(timeout)
                        timeout = setTimeout(() => {
                            setFormData({row: row, field: field, val: $tar.value})
                        }, 200)
                    }
                }}
                data={{
                    row: len,
                    field: f.name
                }}
            />
        })
        const fd = formdata
        setFormData(fd.push(new Object({})))
        newArr.push(row)
        setArray(newArr)
        forceUpdate(!update)
    }

    const removeRow = (arr) => {
        const newArr = arr
        const newFormData = formdata
        if (newArr.length > 1) {
            newArr.pop()
            newFormData.pop()
            setArray(newArr)
            setFormData(newFormData)
            forceUpdate(!update)
        }
    }

    useEffect(() => {
        if (!arr.length) {
            addRow(arr)
        }
    }, [])

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
                                const data = {
                                    data: formdata
                                }
                                MS.post(ENDPOINT.IDEA_ADD, data)
                                    .then((data) => {
                                        setArray([{}])
                                        setFormData([{}])
                                    })
                                    .catch((err) => {
                                        console.error('[microservices] -> ', err)
                                    })
                            })
                        }}
                        disabled={!(formdata.length && Object.keys(formdata[0]).length)}
                        // disabled={true}
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
import React, { useReducer, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Wrapper from './../components/Layout/Wrapper'
import Panel from './../components/Layout/Panel'
import Row from './../components/Layout/Row'
import Text from './../components/atoms/Text'
import Table from './../components/atoms/Table'
import Field from './../components/atoms/Field'
import Notifier from './../components/atoms/Notifier'

import { FIELDS } from './../components/atoms/Table'
import MS from './../services/microservices'
import { ENDPOINT } from './../constant/constant'

const AddNew = (props) => {
    let timeout
    let loading = false
    const [arr, setArray] = useReducer((state, value) => value, [])
    const [response, setResponse] = useState({type: null, message: null})
    const [formdata, setFormData] = useReducer((state, value) => {
        if (value) {
            const {row, field, val} = value
            const data = state
            if (val) {
                data[row][field] = val
            }
            return [...data]
        } else {
            return [{}]
        }
    }, [])
    const [update, forceUpdate] = useState(false)

    const addRow = async (addArr) => {
        const row = {}
        const newArr = addArr 
        const len = addArr.length
        FIELDS.forEach((f) => {
            row[f.name] = <Field elem={`inputbox`} type={`text`} name={f.name + "_row_" + (len + 1)} 
                callbacks={{
                    onChange: (evt) => {
                        response.message && resetNotifier()
                        const $tar = evt.currentTarget
                        const row = $tar.getAttribute('row')
                        const field = $tar.getAttribute('field')
                        clearTimeout(timeout)
                        timeout = setTimeout(() => {
                            setFormData({row: row, field: field, val: $tar.value})
                        }, 500)
                    }
                }}
                data={{
                    row: len,
                    field: f.name
                }}
            />
        })
        const fd = formdata
        setFormData(fd.push({}))
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
            setFormData(newFormData)
            setArray(newArr)
            forceUpdate(!update)
        }
    }

    const resetNotifier = () => {
        setResponse({type:null, message: null})
    }

    useEffect(() => {
        if (!arr.length) {
            addRow(arr)
        }
    }, [props])

    return (
        <Wrapper>
            <Panel>
                <Text elem={`heading`} level={1} value={`Add new items`} />
                <Text elem={`default`} classes={`mar-b25`} value={`Make your idea counts`} />
                <Table data={{ideas: arr}} page={`addnew`} />
                <Row classes={`mar-b25`}>
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
                            onClick: (async (evt) => {
                                loading = true
                                const data = {
                                    data: formdata,
                                    page: 'addnew'
                                }
                                await MS.post(ENDPOINT.IDEA_ADD, data)
                                    .then((data) => {
                                        setFormData(null)
                                        setArray([])
                                        addRow([])
                                        setResponse({type: 'success', message: data.message})
                                        loading = false
                                        return data
                                    })
                                    .catch((err) => {
                                        setResponse({type: 'error', message: err.message})
                                        loading = false
                                        return err
                                    })
                            })
                        }}
                        disabled={loading || !(formdata.length && Object.keys(formdata[0]).length)}
                    />
                </Row>
                {response.message ? 
                    <Row id={`notifier`} classes={`${response.type === 'error' ? 'error mar-b25' : 'mar-b25'}`}>
                        <Notifier type={response.type} message={response.message} />
                    </Row> : null
                }
            </Panel>
        </Wrapper>
    )
}

AddNew.propTypes = {
    heading: PropTypes.string,
    copy: PropTypes.string
}

export default AddNew
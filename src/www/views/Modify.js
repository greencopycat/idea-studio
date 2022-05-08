import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import MS from './../services/microservices'
import { DBHOST, ENDPOINT } from '../constant/constant'

import Wrapper from './../components/Layout/Wrapper'
import Panel from './../components/Layout/Panel'
import Row from './../components/Layout/Row'
import { FIELDS } from './../components/atoms/Table'
import Text from './../components/atoms/Text'
import Field from './../components/atoms/Field'

const Modify = (props) => {
    const [entry, setEntry] = useState({})
    const { id } = useParams()

    useEffect(() => {
        MS.get(`${DBHOST.DEV}${ENDPOINT.IDEA_GET}?_id=${id}`)
            .then(data => {
                if (data && data.body && data.body.length) {
                    setEntry(data.body[0])
                }
            })
            .catch(err => {
                console.error('[err] -> ', err)
            })
    }, [props])

    const htmlFields = () => {
    }

    const handleChange = (evt) => {
        console.log('[evt] -> ', evt)
    }

    return (
        <Wrapper>
            <Panel>
                <Text elem={`heading`} level={1} value={`Modify entry: `} />
                <Text elem={`default`} classes={`mar-b25`} value={`Id: ${id}`} />
                {FIELDS.map((f) => {
                    let val = entry[f.name] || ''
                    let elm = f.elem || 'inputbox'
                    return (
                        <Row key={f.name}>
                            <Field 
                                classes={`mar-b15 font-regular`} 
                                label={`${f.name}${f.required?'*': ''}`} 
                                elem={elm}
                                formField={true}
                                input={val}
                                type={f.name === 'attachments' ? 'file' : null} 
                                callbacks={{
                                    onChange: handleChange
                                }}
                                />
                        </Row>
                    )
                })}

                <Row>
                    <Field elem={`button`} text={`Update`} type={`submit`} />
                    <Field elem={`button`} text={`Cancel`} type={`reset`} />
                </Row>
            </Panel>
        </Wrapper>
    )
}

Modify.propTypes = {
    data: PropTypes.object
}

export default Modify
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
    let timeout
    const [response, setResponse] = useReducer((s,v)=>v, {})
    const [entry, setEntry] = useReducer((s,v)=> v, {})
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

    const handleChange = (evt) => {
        const $tar = evt.currentTarget
        const val = $tar.value
        const name = $tar.name
        const newEntry = {...entry, [name]: val} 
        timeout && clearTimeout(timeout)
        timeout = setTimeout((en) => { 
            setEntry(en) 
        }, 500, newEntry)
    }

    const handleTagClick = (evt) => {
        const $tar = evt.currentTarget
        const val = $tar.innerText
        let newTags = entry.tags
        const index = newTags.indexOf(val)
        if (index > -1) {
            newTags.splice(index, 1)
            setEntry({...entry, tags: newTags})
        }
    }

    const handleTagEnter = (evt) => {
        const $tar = evt.currentTarget
        if (evt.key === 'Enter' || evt.keyCode === 13) {
            const val = $tar.value
            const newTags = entry.tags
            newTags.push(val)
            setEntry({...entry, tags: newTags})
            $tar.value = ''
        }
    }

    const handleSubmit = async (evt) => {
        const newEntry = entry
        delete newEntry.created
        await MS.update(ENDPOINT.IDEA_UPDATE, newEntry)
            .then((data) => {
                console.log('[dev] -> ', data)
                setResponse({type: 'success', message: data.message})
                return data
            })
            .catch((err) => {
                return err
            })
    }

    return (
        <Wrapper>
            <Panel>
                <Text elem={`heading`} level={1} value={`Modify entry: `} />
                <Text elem={`default`} classes={`mar-b25`} value={`Id: ${id}`} />
                {FIELDS.map((f) => {
                    let val = entry[f.name] || ''
                    let elm = f.elem || 'inputbox'
                    const events = {}
                    if (f.name === "tags") {
                        events.onClick = handleTagClick
                        events.onKeyUp = handleTagEnter
                    } else {
                        events.onChange = handleChange
                    }
                    return (
                        <Row key={f.name}>
                            <Field
                                wrapperClasses={`mar-b20`}
                                classes={`font-regular`} 
                                label={`${f.name}${f.required?'*': ''}`} 
                                elem={elm}
                                formField={true}
                                input={val}
                                name={f.name}
                                type={f.name === 'attachments' ? 'file' : null} 
                                callbacks={events}
                                />
                        </Row>
                    )
                })}

                <Row>
                    <Field elem={`button`} text={`Update`} type={`submit`} 
                        callbacks={
                            {
                                onClick: handleSubmit
                            }
                        }
                    />
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
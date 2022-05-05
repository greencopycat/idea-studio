import React, {useEffect, useReducer, useState} from 'react'
import PropTypes from 'prop-types'
import MS from './../services/microservices'
import { ENDPOINT } from '../constant/constant'

import Text from './../components/atoms/Text'
import Wrapper from './../components/Layout/Wrapper'
import Panel from './../components/Layout/Panel'
import Row from './../components/Layout/Row'
import Table, { FIELDS } from './../components/atoms/Table'
import Field from './../components/atoms/Field'
import Dropdown from '../components/atoms/Dropdown'

const DBHOSTNAME = "http://localhost:4000"

const View = (props) => {
    const [ideas, setIdeas] = useReducer((state, value) => value, [])
    const [key, setKey] = useReducer((state, value) => value, null)
    let filterKey
    const excludeFilter = ['attachments', 'url']
    let timeout
    useEffect(() => {
        let value
        setKey(FIELDS[0].name.replace(/\s/g, ''))
        MS.get(`${DBHOSTNAME}${ENDPOINT.IDEA_GET}`)
            .then((data) => {
                value = data.body || []
                setIdeas(value)
            })
            .catch((err) => {
                console.log('[err] -> ', err)
            })
    }, [props])

    const filterByFields = FIELDS.filter(ea => !(excludeFilter.includes(ea.name)))
    const dropdownOptions = filterByFields.map((ea,i) => {
        return {text: ea.name, value: ea.name.replace(/\s/g, ''), default: i===0}
    })

    return (
        <Wrapper>
            <Panel>
                <Text elem={`heading`} level={1} value={`View ideas`} />
                <Text classes={`mar-b25`} elem={`default`} value={`What's on your mind?`} />
                <div className={`inline-flex align-items-c`}>
                    <Text 
                        classes={`inline-block mar-b10`}
                        elem={`label`} 
                        value={`Filtered by: `}
                    />
                    <Dropdown 
                        classes={`font-regular mar-b10 mar-l10`}
                        options={dropdownOptions} 
                        onSelect={(evt) => { setKey(evt.currentTarget.value) }}
                    />
                    <Field elem={`inputbox`} 
                        type={`search`} 
                        classes={`search mar-b10 mar-t0 mar-l10`}
                        placeholder={`filter`}
                        display={`inline-block`}
                        callbacks={{
                            onChange: (evt) => {
                                timeout && clearTimeout(timeout)
                                const $tar = evt.currentTarget
                                const val = $tar.value

                                const query = val ? `?${key}=` + val : ''
                                timeout = setTimeout(async () => {
                                    await MS.get(ENDPOINT.IDEA_GET + query)
                                        .then((data) => {
                                            setIdeas(data.body)
                                        })
                                        .catch((err) => {
                                            console.error('[get by %s] -> ', key, err)
                                        })
                                }, 800)
                            }
                        }}
                    />
                </div>
                <Row>
                    <Table data={{ideas: ideas}} />
                </Row>
                {!ideas.length ? <Row><Text elem={`default`} value={`No record found.`} /></Row> : null}
            </Panel>
        </Wrapper>
    )
}

View.propTypes = {
    heading: PropTypes.string,
    copy: PropTypes.string
}

export default View
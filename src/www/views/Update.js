import React, { useEffect, useReducer, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import MS from './../services/microservices'
import { DBHOST, ENDPOINT } from '../constant/constant'

import Wrapper from './../components/Layout/Wrapper'
import Panel from './../components/Layout/Panel'
import Row from './../components/Layout/Row'
import Table, { FIELDS } from './../components/atoms/Table'
import Text from './../components/atoms/Text'
import Field from './../components/atoms/Field'
import Dropdown from './../components/atoms/Dropdown'
import Notifier from './../components/atoms/Notifier'

const Update = (props) => {
    const [response, setResponse] = useState({})
    const [arr, setArr] = useReducer((state, val)=> val, [])
    const [key, setKey] = useReducer((state, value) => value, 'author')
    const excludeFilter = ['attachment', 'url']
    let timeout
    const filterByFields = FIELDS.filter(ea => !(excludeFilter.includes(ea.name)))
    const dropdownOptions = filterByFields.map((ea, i) => {
        return {text: ea.name, value: ea.name.replace(/\s/g, ''), default: i===0}
    })
    useEffect(() => {
        let value
        MS.get(`${DBHOST.DEV}${ENDPOINT.IDEA_GET}`)
            .then((data) => {
                value = data.body || []

                setArr(value)
            })
            .catch((err) => {
                console.error('[failed]')
            })
    }, [props])

    useEffect(() => {
        if (response.message) {
            const notif = document.querySelector('.notifier')
            setTimeout(() => {
                notif.scrollIntoView()
            }, 300)
        }
    }, [response])

    return (
        <Wrapper>
            <Panel>
                <Text elem={`heading`} level={1} value={`Update ideas`} />
                <Text elem={`default`} classes={`mar-b25`} value={`Couldn't make up your mind?`} />
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
                                            setArr(data.body)
                                        })
                                        .catch((err) => {
                                            console.error('[get by %s] -> ', key, err)
                                        })
                                }, 800)
                            }
                        }}
                    />
                </div>
                <Table data={{ideas: arr}} page={`update`} 
                    callbacks={{
                        setResponse,
                    }}
                />
                {response.message ? 
                    <div className={[`notifier`]}>
                        <Notifier message={response.message} />
                    </div>
                : null}
            </Panel>
        </Wrapper>
    )
}

Update.propTypes = {
    data: PropTypes.object
}

export default Update
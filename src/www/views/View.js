import React, {useEffect, useReducer, useState} from 'react'
import PropTypes from 'prop-types'
import MS from './../services/microservices'
import { ENDPOINT } from '../constant/constant'

import Text from './../components/atoms/Text'
import Wrapper from './../components/Layout/Wrapper'
import Panel from './../components/Layout/Panel'
import Row from './../components/Layout/Row'
import Table from './../components/atoms/Table'
import Field from './../components/atoms/Field'

const DBHOSTNAME = "http://localhost:4000"

const View = (props) => {
    const [ideas, setIdeas] = useReducer((state, value) => value, [])
    const [key, setKey] = useReducer((state, value) => value, 'tags')
    let timeout
    useEffect(() => {
        let value
        MS.get(`${DBHOSTNAME}${ENDPOINT.IDEA_GET}`)
            .then((data) => {
                value = data.body || []
                setIdeas(value)
            })
            .catch((err) => {
                console.log('[err] -> ', err)
            })
    }, [props])

    return (
        <Wrapper>
            <Panel>
                <Text elem={`heading`} level={1} value={`View ideas`} />
                <Text classes={`mar-b25`} elem={`default`} value={`What's on your mind?`} />
                <Row>
                    <Field elem={`inputbox`} type={`search`} placeholder={`View by tags`} classes={`search, mar-b10`} label={`Search by tag: `} 
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
                                            console.error('[get by tags] -> ', err)
                                        })
                                }, 800)
                            }
                        }}
                    />
                </Row>
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
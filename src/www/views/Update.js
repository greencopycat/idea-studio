import React, { useEffect, useReducer, useState } from 'react'
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
    const [response, setResponse] = useState()
    const [arr, setArr] = useReducer((state, val)=> val, [])

    useEffect(() => {
        let value
        MS.get(`${DBHOST.DEV}${ENDPOINT.IDEA_GET}`)
            .then((data) => {
                value = data.body || []
                value.map((v) => {
                    v['func'] = "[m][d]"
                    return v
                })

                setArr(value)
            })
            .catch((err) => {
                console.error('[failed]')
            })
    }, [props])
    return (
        <Wrapper>
            <Panel>
                <Text elem={`heading`} level={1} value={`Update ideas`} />
                <Text elem={`default`} classes={`mar-b25`} value={`Couldn't make up your mind?`} />
                <Table data={{ideas: arr}} page={`update`} />
                <Row classes={`mar-b25`}>
                    <Field elem={`button`} text={`Modify`} type={`submit`} 
                        callbacks={{
                            onClick: (() => { 
                                console.log('[modify]')
                            })
                        }}
                    />
                    <Field elem={`button`} text={`Delete`} type={`submit`} 
                        callbacks={{
                            onClick: (() => {
                                console.log('[delete]')
                            })
                        }}
                    />
                </Row>
                {Response.message ? 
                    <Row classes={`${response.type === 'error' ? 'error' : ''}`}>
                        <Notifier type={Response.type} message={Response.message} />
                    </Row> : null
                }
            </Panel>
        </Wrapper>
    )
}

Update.propTypes = {
    data: PropTypes.object
}

export default Update
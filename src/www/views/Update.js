import React, { useReducer, useState } from 'react'
import PropTypes from 'prop-types'

import Wrapper from './../components/Layout/Wrapper'
import Panel from './../components/Layout/Panel'
import Row from './../components/Layout/Row'
import Table from './../components/atoms/Table'
import Text from './../components/atoms/Text'
import Field from './../components/atoms/Field'
import Notifier from './../components/atoms/Notifier'

const Update = (props) => {
    const [response, setResponse] = useState()
    const [arr, setArr] = useReducer((state, val)=> val, [])
    return (
        <Wrapper>
            <Panel>
                <Text elem={`heading`} level={1} value={`Update ideas`} />
                <Text elem={`default`} classes={`mar-b25`} value={`Couldn't make up your mind?`} />
                <Table data={{ideas: arr}} page={`update`} />
                <Row classes={`mar-b25`} />
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
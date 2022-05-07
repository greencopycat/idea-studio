import React, { useEffect, useReducer, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import MS from './../services/microservices'
import { DBHOST, ENDPOINT } from '../constant/constant'

import Wrapper from './../components/Layout/Wrapper'
import Panel from './../components/Layout/Panel'
import Row from './../components/Layout/Row'
import { FIELDS } from './../components/atoms/Table'
import Text from './../components/atoms/Text'
import Field from './../components/atoms/Field'
import Dropdown from './../components/atoms/Dropdown'
import Notifier from './../components/atoms/Notifier'

const Modify = (props) => {
    const [id, setId] = useState(null)

    useEffect(() => {
        if (window && 'location' in window) {
            setId(window.location.href.split('/').pop())
            
        }
    }, [props])
    return (
        <Wrapper>
            <Panel>
                <Text elem={`heading`} level={1} value={`Modify entry: `} />
                <Text elem={`default`} classes={`mar-b25`} value={`Id: ${id}`} />
            </Panel>
        </Wrapper>
    )
}

Modify.propTypes = {
    data: PropTypes.object
}

export default Modify
import React, {useEffect, useReducer, useState} from 'react'
import PropTypes from 'prop-types'
import MS from './../services/microservices'
import { ENDPOINT } from '../constant/constant'

import Text from './../components/atoms/Text'
import Wrapper from './../components/Layout/Wrapper'
import Panel from './../components/Layout/Panel'
import Row from './../components/Layout/Row'
import Table from './../components/atoms/Table'

const DBHOSTNAME = "http://localhost:4000"

const View = (props) => {
    const [ideas, setIdeas] = useReducer((state, value) => value, [])
    useEffect(() => {
        let value
        MS.get(`${DBHOSTNAME}${ENDPOINT.IDEA_GET}`)
            .then((data) => {
                value = data.body
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
                <Text classes={`mar-b25`} elem={`default`} value={`What's in your mind?`} />
                <Row>
                    <Table data={{ideas: ideas}} />
                </Row>
            </Panel>
        </Wrapper>
    )
}

View.propTypes = {
    heading: PropTypes.string,
    copy: PropTypes.string
}

export default View
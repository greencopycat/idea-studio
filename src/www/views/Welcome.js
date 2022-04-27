import React from 'react'
import PropTypes from 'prop-types'

import Wrapper from './../components/Layout/Wrapper'
import Panel from '../components/Layout/Panel'
import Text from './../components/atoms/Text'

const Welcome = (props) => {
    return (
        <>
            <Wrapper>
                <Panel>
                    <Text elem={`heading`} level={1} value={`Welcome page`} />
                    <Text elem={`default`} value={`Please select page from menu.`} />
                </Panel>
            </Wrapper>
        </>
    )
}

Welcome.propTypes = {
    feed: PropTypes.object
}

export default Welcome
import React from 'react'
import Wrapper from './../components/Layout/Wrapper/Wrapper'
import Panel from './../components/Layout/Panel'

import Text from './../components/atoms/Text'

const Missing = (props) => {
    return (
        <Wrapper>
            <Panel>
                <Text elem={`heading`} level={1} value='404' />
                <Text elem={`default`} value={`I think you are lost.`} />
            </Panel>
        </Wrapper>
    )
}


export default Missing
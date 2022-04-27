import React from 'react'
import Wrapper from './../components/Layout/Wrapper/Wrapper'

import Text from './../components/atoms/Text'

const Missing = (props) => {
    return (
        <Wrapper>
            <Text elem={`heading`} level={1} value='404' />
            <Text elem={`default`} value={`I think you are lost.`} />
        </Wrapper>
    )
}


export default Missing
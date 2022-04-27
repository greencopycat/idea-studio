import React from 'react'
import PropTypes from 'prop-types'

import Wrapper from './../components/Layout/Wrapper'
import Panel from './../components/Layout/Panel'
import Row from './../components/Layout/Row'
import Text from './../components/atoms/Text'

const AddNew = (props) => {
    return (
        <Wrapper>
            <Panel>
                <Row class={`mar-b25`}>
                    <Text elem={`heading`} level={1} value={`Add new items`} />
                </Row>
            </Panel>
        </Wrapper>
    )
}

AddNew.propTypes = {
    heading: PropTypes.string,
    copy: PropTypes.string
}

export default AddNew
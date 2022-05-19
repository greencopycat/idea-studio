import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Wrapper from './../components/Layout/Wrapper'
import Panel from './../components/Layout/Panel'
import Text from './../components/atoms/Text'
import Row from './../components/Layout/Row'
import Table from './../components/atoms/Table'
import Notifier from './../components/atoms/Notifier'

const Tags = (props) => {

    useEffect(() => {
        console.log('[dev] -> effect!')
    }, [props])
    
    return (
        <Wrapper>
            <Panel>
                <Text elem={`heading`} level={1} value={`View Tags`} />
                <Text elem={`default`} classes={`mar-b25`} value={`This and that...`} />
                <Table data={{ideas: []}} page={`tag`} />
            </Panel>
        </Wrapper>
    )
}

Tags.propTypes = {
    feed: PropTypes.object
}

export default Tags
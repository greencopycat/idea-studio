import React, { useReducer, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Wrapper from './../components/Layout/Wrapper'
import Panel from './../components/Layout/Panel'
import Row from './../components/Layout/Row'
import Text from './../components/atoms/Text'
import Table from './../components/atoms/Table'

import { FIELDS } from './../components/atoms/Table'

const AddNew = (props) => {
    const [arr, setArray] = useReducer((state, value) => value, [])

    const addRow = () => {
        const row = {}
        FIELDS.forEach((key) => {
            row[key] = <FIELDS elem={`inputbox`} />
        })
    }
    return (
        <Wrapper>
            <Panel>
                <Text elem={`heading`} level={1} value={`Add new items`} />
                {/* <Table data={addRow} /> */}
            </Panel>
        </Wrapper>
    )
}

AddNew.propTypes = {
    heading: PropTypes.string,
    copy: PropTypes.string
}

export default AddNew
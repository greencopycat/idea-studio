import React, {useEffect, useReducer, useRef, useState} from 'react'
import PropTypes from 'prop-types'

import styles from './Table.module.css'

const fields = ['id', 'author', 'idea', 'tags', 'description', 'attachments', 'url', 'note', 'created' ]

const Table = (props) => {
    const [tableData, setTableData] = useReducer((state, val) => val, [])
    const tableHeaders = useRef(null)
    const tableContent = useRef(null)
    const [update, forceUpdate] = useState(false)
    useEffect(() => {
        const ideas = props.data.ideas
        let renderData = []
        ideas.forEach((id) => {
            const rowData = {}
            fields.forEach((f) => {
                rowData[f] = id[f] || ''
            })
            renderData.push(rowData)
        })
        setTableData(renderData)
    }, [props])

    useEffect(() => {
        if(tableData.length) {
            let headRow = []
            fields.forEach((f, i) => {
                headRow.push(<th key={`${f}_th_${i}`}>{f.toUpperCase()}</th>)
            })
            tableHeaders.current = (<tr>{headRow}</tr>)
            let rowData = []
            tableData.forEach((row,j) => {
                let cellData = []
                Object.keys(row).forEach((key, i) => {
                    let value = ''
                    if(!row[key].$$typeof && typeof row[key] === 'object') {
                        value = row[key].join(', ')
                    } else {
                        value = row[key]
                    }
                    cellData.push(<td key={`${key}_${i}`}>{value}</td>)
                })
                rowData.push(<tr key={`${j}__${row.id}`}>{cellData}</tr>)
            })
            tableContent.current = rowData
            forceUpdate(!update)
        }
    }, [tableData])

    const classes = [styles.wrapper, 'font-regular']
    return (
        <div className={classes.join(' ')}>
            <table>
                <thead>
                    {tableHeaders.current}
                </thead>
                <tbody>
                    {tableContent.current}
                </tbody>
            </table>
        </div>
    )
}

Table.propTypes = {
    data: PropTypes.object
}

export default Table
export { fields as FIELDS }
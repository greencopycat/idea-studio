import React, {useEffect, useReducer, useRef, useState} from 'react'
import PropTypes from 'prop-types'

import styles from './Table.module.css'

import Field from './../Field'

const fields = [{ name: 'author', required: true}, { name: 'idea', required: true}, { name: 'tags', required: true}, { name: 'description'}, { name: 'attachments'}, { name: 'url'}, { name: 'note'} ]

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
                rowData[f.name] = id[f.name] || ''
            })
            rowData[`func`] = id[`func`]
            rowData[`id`] = id[`_id`]
            renderData.push(rowData)
        })
        setTableData(renderData)
    }, [props])

    useEffect(() => {
        let headRow = []
        fields.forEach((ea, i) => {
            const {name, required} = ea
            headRow.push(<th key={`${name}_th_${i}`}>{name.toUpperCase()}</th>)
        })
        tableHeaders.current = (<tr>{headRow}</tr>)
        // if(tableData.length) {
        let rowData = []
        tableData.forEach((row,j) => {
            let cellData = []
            Object.keys(row).forEach((key, i) => {
                let value = ''
                let cellstyle = ''
                if(key === 'func') {
                    let del = <Field elem={`button`} icon={`del`} display={`inline-block`} 
                        callbacks={{
                            onClick: (evt) => {
                                console.log('[click] -> ', row[`id`])
                            }
                        }}
                    />
                    let mod = <Field elem={`button`} icon={`mod`} display={`inline-block`} 
                        callbacks={{
                            onClick: (evt) => {
                                window.location.assign(window.location.href + '/' + row[`id`])
                            }
                        }}
                    />
                    value = <>{mod}{del}</>
                } else 
                if (key === 'id') {

                } else
                if(!row[key].$$typeof && typeof row[key] === 'object') {
                    value = row[key].join(', ')
                } else {
                    value = row[key]
                }
                if (props.page && props.page === 'addnew') {
                    cellstyle = 'pad-0'
                }
                key !== 'id' && cellData.push(<td className={cellstyle} key={`${key}_${i}`}>{value}</td>)
            })
            rowData.push(<tr key={`${j}__${row.id}`}>{cellData}</tr>)
        })
        tableContent.current = rowData
        forceUpdate(!update)
        // }
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
    data: PropTypes.object,
    page: PropTypes.oneOf(['addnew', 'view', 'update'])
}

export default Table
export { fields as FIELDS }
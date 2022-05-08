import React, {useEffect, useReducer, useRef, useState} from 'react'
import PropTypes from 'prop-types'

import styles from './Table.module.css'
// import { IDEA_DEL, DBHOST } from './../../../constant'
import { ENDPOINT, DBHOST } from './../../../constant/constant'

import Field from './../Field'
import Row from './../../Layout/Row'
import Text from './../Text'
import Modal from './../Modal'
import MS from './../../../services/microservices'

const fields = [
    { name: 'author', required: true}, 
    { name: 'idea', required: true}, 
    { name: 'tags', elem: 'tags', required: true }, 
    { name: 'description', elem: 'textbox'}, 
    { name: 'attachments'}, 
    { name: 'url'}, 
    { name: 'note', elem: 'textbox'} 
]

const Table = (props) => {
    const [tableData, setTableData] = useReducer((state, val) => val, [])
    const tableHeaders = useRef(null)
    const tableContent = useRef(null)
    const [modalActive, setModalActive] = useReducer((s,v) => v, false)
    const activeId = useRef(null)
    const [update, forceUpdate] = useState(false)

    const toolbox = (id) => {
        return (
            <td className={styles.toolbox}>
                <Field elem={`button`} icon={`mod`} display={`inline-block`} 
                    callbacks={{
                        onClick: (evt) => {
                            window.location.assign(window.location.href + '/' + id)
                        }
                    }}
                />
                <Field elem={`button`} icon={`del`} display={`inline-block`} 
                    callbacks={{
                        onClick: (evt) => {
                            setModalActive(true)
                            activeId.current = id
                        }
                    }}
                />
            </td>
        )
    }

    useEffect(() => {
        const ideas = props.data.ideas
        let renderData = []
        ideas.forEach((id) => {
            const rowData = {}
            fields.forEach((f) => {
                rowData[f.name] = id[f.name] || ''
            })
            id[`func`] && (rowData[`func`] = id[`func`])
            id[`_id`] && (rowData[`_id`] = id[`_id`])
            renderData.push(rowData)
        })
        setTableData(renderData)
    }, [props])

    useEffect(() => {
        let headRow = []
        fields.forEach((ea, i) => {
            const {name, required} = ea
            headRow.push(<th key={`${name}_th_${i}`}>{name.toUpperCase()}{(props.page === 'addnew' && required)? <small><sup>*</sup></small> : null}</th>)
        })
        tableHeaders.current = (<tr>{headRow}</tr>)
        let rowData = []
        tableData.forEach((row,j) => {
            let cellData = []
            Object.keys(row).forEach((key, i) => {
                let value = ''
                let cellstyle = ''
                if (key !== '_id') {
                    if(!row[key].$$typeof && typeof row[key] === 'object') {
                        value = row[key].join(', ')
                    } else {
                        value = row[key]
                    }
                }
                if (props.page && props.page === 'addnew') {
                    cellstyle = 'pad-0'
                }
                key !== '_id' && cellData.push(<td className={cellstyle} key={`${key}_${i}`}>{value}</td>)
            })
            rowData.push(<tr key={`${j}__${row.id}`}>{cellData}{props.page === 'update' ? toolbox(row[`_id`]): null}</tr>)
        })
        tableContent.current = rowData
        forceUpdate(!update)
    }, [tableData])

    const deleteTheRecord = (id) => {
        MS.remove(`${DBHOST.Dev}${ENDPOINT.IDEA_DEL}`, {id})
            .then( data => {
                const callbacks = props.callbacks
                setModalActive(false)
                if (callbacks) {
                    if (callbacks.setArr) {
                        const newTableData = tableData.filter((row) => {
                            return (row._id !== id) 
                        })
                        callbacks.setArr(newTableData)
                    }
                    if (callbacks.setResponse) {
                        callbacks.setResponse({
                            message: data.message + ' [id: ' + id + ']'
                        })
                    }
                }
            })
            .catch(err => {
                setModalActive(false)
            })
    }

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
            {!(tableContent.current && tableContent.current.length)? 
                <Row>
                    <Text elem={`default`} value={`No record found.`} />
                </Row> : null
            }
            <Modal
                heading={`Are you sure you want delete this record?`}
                text={`Click 'yes' to proceed or 'no' to cancel the action.`}
                events={{
                    confirm: (evt) => {
                        deleteTheRecord.apply(this, [activeId.current]) 
                    },
                    cancel: (evt) => {
                        setModalActive(false)
                    }
                }}
                open={modalActive}
            />
        </div>
    )
}

Table.propTypes = {
    data: PropTypes.object,
    page: PropTypes.oneOf(['addnew', 'view', 'update']),
    callbacks: PropTypes.objectOf(PropTypes.func)
}

export default Table
export { fields as FIELDS }
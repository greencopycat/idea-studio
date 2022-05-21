import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'

import Wrapper from '../components/Layout/Wrapper'
import Panel from '../components/Layout/Panel'
import Text from '../components/atoms/Text'
import Row from '../components/Layout/Row'
import Table from '../components/atoms/Table'
import Notifier from '../components/atoms/Notifier'
import Tags from '../components/atoms/Tags'
import MS from './../services/microservices'
import { ENDPOINT } from '../constant/constant'

const TagView = (props) => {
    const [tags, setTags] = useReducer((s,v) => v, [])
    useEffect(() => {
        MS.get(ENDPOINT.IDEA_TAGS)
            .then((data) => {
                if (data && data.body && Array.isArray(data.body)) {
                    setTags(data.body)
                }
            })
            .catch((err) => {
                console.error('[error] -> ', err)
            })
    }, [props])

    return (
        <Wrapper>
            <Panel>
                <Text elem={`heading`} level={1} value={`View Tags`} />
                <Text elem={`default`} classes={`mar-b25`} value={`This and that...`} />
                {/* <Table data={{ideas: []}} page={`tag`} /> */}
                <table className={'font-regular'} style={{borderCollapse: 'collapse', width: '100%'}}>
                    <tbody>
                        {tags.length && tags.map((ea) => {
                            return (
                                <tr>
                                    <td style={{border: 'thin solid #acbeda', padding: '.5rem 1.5rem', textAlign: 'center', width: '4rem'}}>{ea.count}</td>
                                    <td style={{border: 'thin solid #acbeda', padding: '.5rem 1.5rem'}}>
                                        <details className={`font-regular`} key={ea._id}>
                                            <summary>{ea._id}</summary>
                                            <ul>
                                                {ea.ideas && ea.ideas.map((item, i) => {
                                                    return <li key={ea._id + '_' + i}>{item.idea}</li>
                                                })}
                                            </ul>
                                        </details>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Panel>
        </Wrapper>
    )
}

TagView.propTypes = {
    feed: PropTypes.object
}

export default TagView
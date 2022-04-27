import React, { useContext, useReducer } from 'react'
import Panel from './../components/Layout/Panel'
import Store from './../Context/Store'
import Row from './../components/Layout/Row'
import Field from './../components/atoms/Field'
import Wrapper from './../components/Layout/Wrapper'
import Notifier from './../components/atoms/Notifier'
import Link from './../components/atoms/Link'
import Text from './../components/atoms/Text'


import MS from './../services/microservices'
import { ENDPOINT } from './../constant/constant'

const DBHOSTNAME = 'http://localhost:4000'

const Populate = (props) => {
    const store = useContext(Store)
    const [error, setError] = useReducer((state, value) => value, false)
    const [message, setMessage] = useReducer((state, value) => {
        return {
            message: value.message || 'Error. Please check and try again.'
        }
    }, null)
    // use cms[lang] to toggle between different languages
    console.log('[lang] -> lang -> ', store.lang, store.theme)
    const resetMessage = () => {
        setMessage(null)
    }
    return (
        <Wrapper>
            <Panel>
                <Row>
                    <Text display={`block`} elem={`heading`} level={1} value={`Populate DB from file`} />
                </Row>
                <Row classes={`mar-b25`}>
                    <Text display={`block`} elem={`description`} value={`Please download and use template file to populate DB.`} />
                </Row>
                <Row classes={`mar-b25`}>
                    <div>
                        <Text elem={`default`} value={`Template: `} display={`inline`} />
                        <Link url={`${DBHOSTNAME}/bubble/template`} text={`Download`} download={true} />
                    </div>
                </Row>
                <Row classes={`mar-b25`}>
                    <div className={`flex`}>
                        <Field 
                            display={`inline-block`}
                            elem={'inputbox'} 
                            type={`file`}
                            id={`file`}
                            accept={`.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .numbers`}
                        />
                        <Field display={`inline-block`} elem={'button'} text={`Submit`} type={`submit`} 
                            callbacks={{
                                onClick: ((evt) => {
                                    const $file = document.querySelector('#file')
                                    if ($file.files && $file.files.length) {
                                        const formdata = new FormData()
                                        formdata.append('doc', $file.files.item(0))

                                        MS.post(DBHOSTNAME + ENDPOINT.IDEA_POPULATE, formdata)
                                            .then((resp) => {
                                                setError(false)
                                                setMessage(resp)
                                            })
                                            .catch((err) => {
                                                setError(true)
                                                setMessage(err)
                                            })
                                    } else {
                                        setError(true)
                                        setMessage({status: 400, message: 'Please select a file.'})
                                    }
                                })
                            }}
                        />
                    </div>
                </Row>
                { message ? 
                    <Row classes={`${error ? 'error' : ''}`}>
                        <Notifier {...message} />
                    </Row> : null 
                }
            </Panel>
        </Wrapper>
    )
}

export default Populate
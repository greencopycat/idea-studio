import React, { useContext, useReducer, useRef } from 'react'
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
    const [message, setMessage] = useReducer((state, value) => {
        return value.message ? {
            isError: value.status !== 200,
            message: value.message 
        } : undefined
    }, null)
    const isDirty = useRef(false)
    // use cms[lang] to toggle between different languages
    // console.log('[lang] -> lang -> ', store.lang, store.theme)
    const resetMessage = () => {
        setMessage({status: undefined, message: undefined})
    }
    return (
        <Wrapper>
            <Panel>
                <Text elem={`heading`} level={1} value={`Populate DB from file`} />
                <Text classes={`mar-b25`} elem={`default`} value={`Please download and use template file to populate DB.`} />
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
                            callbacks={{
                                onClick: ((evt) => {
                                    // resetMessage(null)
                                }),
                                onChange: ((evt) => {
                                    if (evt.currentTarget.files.length) {
                                        isDirty.current = true
                                        resetMessage(null)
                                    }
                                })
                            }}
                        />
                        <Field display={`inline-block`} elem={'button'} text={`Submit`} type={`submit`} 
                            callbacks={{
                                onClick: (async (evt) => {
                                    setMessage({status: undefined, message: undefined})
                                    const $file = document.querySelector('#file')
                                    if ($file.files && $file.files.length) {
                                        const formdata = new FormData()
                                        formdata.append('doc', $file.files.item(0))

                                        await MS.post(DBHOSTNAME + ENDPOINT.IDEA_POPULATE, { data: formdata, page: 'populate'})
                                            .then((resp) => {
                                                setMessage(resp)
                                            })
                                            .catch((err) => {
                                                setMessage(err)
                                            })
                                    } else {
                                        setMessage({status: 400, message: 'Please select a file.'})
                                    }
                                })
                            }}
                            disabled={!isDirty.current}
                        />
                    </div>
                </Row>
                { message ? 
                    <Row classes={`${message.isError ? 'error' : ''}`}>
                        <Notifier {...message} />
                    </Row> : null 
                }
            </Panel>
        </Wrapper>
    )
}

export default Populate
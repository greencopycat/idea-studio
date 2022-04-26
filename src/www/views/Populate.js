import React, { useContext, useReducer } from 'react'
import Panel from './../components/Layout/Panel'
import Store from './../Context/Store'
import Row from './../components/Layout/Row'
import Field from './../components/atoms/Field'
import Wrapper from './../components/Layout/Wrapper'
import Notifier from './../components/atoms/Notifier'
import Link from './../components/atoms/Link'
import file from './../documents/populate.xlsx'


import MS from './../services/microservices'
import { ENDPOINT } from './../constant/constant'

const HOSTNAME = 'http://localhost:4000'

const Populate = (props) => {
    const store = useContext(Store)
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
                    <Field 
                        elem={'inputbox'} 
                        type={`file`}
                        id={`file`}
                        accept={`.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .numbers`}
                    />
                    <Field elem={'button'} text={`Submit`} type={`submit`} 
                        callbacks={{
                            onClick: ((evt) => {
                                const $file = document.querySelector('#file')
                                if ($file.files && $file.files.length) {
                                    const formdata = new FormData()
                                    formdata.append('doc', $file.files.item(0))

                                    MS.post(HOSTNAME + ENDPOINT.IDEA_POPULATE, formdata)
                                        .then((resp) => {
                                            setMessage(resp)
                                        })
                                        .catch((err) => {
                                            setMessage(err)
                                        })
                                } else {
                                    console.error('[file] -> Please provide file.')
                                }
                            })
                        }}
                    />
                </Row>
                { message ? <Notifier {...message} /> : null }
                <Row>
                    <Link url={`http://localhost:4000/bubble/template`} text={`Download template`} download={true} />
                </Row>
            </Panel>
        </Wrapper>
    )
}

export default Populate
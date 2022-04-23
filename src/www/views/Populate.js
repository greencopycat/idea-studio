import React, { useContext } from 'react'
import Panel from './../components/Panel'
import Store from './../Context/Store'
import Field from './../components/atoms/Field'


const Populate = (props) => {
    const store = useContext(Store)
    // use cms[lang] to toggle between different languages
    console.log('[lang] -> lang -> ', store.lang, store.theme)
    return (
        <>
            <Panel>
                <Field type={'dropdown'} label={`City`} />
            </Panel>
        </>
    )
}

export default Populate
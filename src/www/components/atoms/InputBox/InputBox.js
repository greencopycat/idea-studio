import React from 'react'
import PropTypes from 'prop-types'

const InputBox = (props) => {
    // value, pattern, type, placeholder
    const events = {
        onChange: props.onChange
    }
    console.log('[accept] -> ', props.accept)
    return (
        <>
            <input 
                accept={props.accept}
                disabled={props.disabled}
                download={props.download}
                {...events} 
                id={props.id}
                name={props.name}
                pattern={props.pattern}
                placeholder={props.placeholder} 
                type={props.type} 
            />
        </>
    )
}

InputBox.propTypes = {
    accept: PropTypes.string,
    disabled: PropTypes.bool,
    download: PropTypes.bool,
    events: PropTypes.objectOf(PropTypes.func),
    id: PropTypes.string,
    name: PropTypes.string,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string
}

export default InputBox
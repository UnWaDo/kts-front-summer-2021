import React from 'react';
import './ErrorMessage.css'

type ErrorMessageProps = {
    disabled: boolean,
    text: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ disabled, text }) => {
    if (disabled)
        return <br />
    return <p className='error'>{text}</p>
}

export default ErrorMessage;
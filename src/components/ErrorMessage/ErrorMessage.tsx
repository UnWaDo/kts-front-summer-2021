import React from 'react';

import styles from './ErrorMessage.module.scss';

type ErrorMessageProps = {
    disabled: boolean,
    text: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ disabled, text }) => {
    if (disabled)
        return <br />
    return <p className={styles['error']}>{text}</p>
}

export default ErrorMessage;
import React, { ChangeEvent } from 'react';

import styles from './Input.module.scss';

type InputProps = {
    value: string,
    placeholder: string,
    onChange: (value: string) => void
}

const Input: React.FC<InputProps> = ({ value, placeholder, onChange }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return <input className={styles['input']}
        value={value}
        placeholder={placeholder}
        onChange={handleChange} />;
}

export default React.memo(Input);
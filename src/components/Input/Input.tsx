import React from 'react';
import './Input.css'

type InputProps = {
    value: string,
    placeholder: string,
    onChange: React.ChangeEventHandler
}

const Input: React.FC<InputProps> = ({ value, placeholder, onChange }) => {
    return <input className='input'
        value={value}
        placeholder={placeholder}
        onChange={onChange} />;
}

export default Input;
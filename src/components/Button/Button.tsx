import React from "react";
import './Button.css'

type ButtonProps = {
    disabled: boolean,
    onClick: React.MouseEventHandler,
    children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ disabled, children, onClick }) => {
    return <button className='button' onClick={onClick} disabled={disabled}>{children}</button>
}

export default Button;
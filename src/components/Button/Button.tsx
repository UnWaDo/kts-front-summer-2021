import React from "react";

import styles from './Button.module.scss';

type ButtonProps = {
    disabled: boolean,
    onClick: React.MouseEventHandler,
    children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ disabled, children, onClick }) => {
    return <button className={styles['button']} onClick={onClick} disabled={disabled}>{children}</button>
}

export default React.memo(Button);
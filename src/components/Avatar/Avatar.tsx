import React from 'react';

import styles from './Avatar.module.scss';

type AvatarProps = {
    src: string | null,
    letter: string,
    alt: string | null
}

const Avatar: React.FC<AvatarProps> = ({ src, letter, alt }) => {
    if (src) {
        return <div className={styles['avatar']}>
            <img className={styles['avatar__image']} src={src} alt={alt || ''}></img>
        </div >
    }
    return <div className={styles['avatar']}>{letter}</div>
}

export default React.memo(Avatar);
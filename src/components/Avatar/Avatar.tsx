import React from 'react'
import './Avatar.css'

type AvatarProps = {
    src: string | null,
    letter: string,
    alt: string | null
}

const Avatar: React.FC<AvatarProps> = ({ src, letter, alt }) => {
    if (src) {
        return <div className='avatar'>
            <img className='avatar__image' src={src} alt={alt || ''}></img>
        </div >
    }
    return <div className='avatar'>{letter}</div>
}

export default React.memo(Avatar);
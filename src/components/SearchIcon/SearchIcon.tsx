import React from 'react';

import styles from './SearchIcon.module.scss';

const SearchIcon: React.FC = () => {
    return <svg className={styles['search-icon']} fill='currentColor' xmlns='http://www.w3.org/2000/svg'
        width='100%' height='100%'
        viewBox='0 0 17.5 17.5'>
        <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="white" />
    </svg>

}

export default React.memo(SearchIcon);
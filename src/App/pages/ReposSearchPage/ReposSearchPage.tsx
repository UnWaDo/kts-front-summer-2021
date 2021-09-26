import { useContext, useState } from 'react'
import React from 'react'

import Button from '@components/Button'
import ErrorMessage from '@components/ErrorMessage'
import Input from '@components/Input'
import ReposContext from '@components/ReposContext'
import ReposList from '@components/ReposList'
import SearchIcon from '@components/SearchIcon'
import { Meta } from '@utils/meta'
import { observer } from 'mobx-react-lite'

import styles from './ReposSearchPage.module.scss'

const ReposSearchPage = () => {
    const reposContext = useContext(ReposContext);
    const reposListStore = reposContext.reposListStore;
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    const searchRepo = React.useCallback(() => {
        if (input === '') {
            setError('Строка поиска не должна быть пустой');
            return;
        }
        setError('');
        reposListStore.loadReposFirst(input);
    }, [input, reposListStore]);

    return <div>
        <div className={styles['repos-search-list']}>
            <div className={styles['repos-search-list__header']}>
                <Input
                    placeholder='Введите название организации'
                    value={input}
                    onChange={React.useCallback((value: string) => setInput(value), [])} />
                <Button
                    disabled={reposListStore.meta === Meta.loading}
                    onClick={searchRepo}
                    children={<SearchIcon />} />
            </div>
            <ErrorMessage text={error} disabled={error === ''} />
            <div>
                <ReposList />
            </div>
        </div>
    </div>
}

export default observer(ReposSearchPage);
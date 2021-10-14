import { useContext } from 'react'
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

    const searchRepo = React.useCallback(() => {
        reposListStore.loadReposFirst();
    }, [reposListStore]);

    const onInputChange = React.useCallback((value: string) => reposListStore.setOrganizationName(value), [reposListStore]);

    return <div>
        <div className={styles['repos-search-list']}>
            <div className={styles['repos-search-list__header']}>
                <Input
                    placeholder='Введите название организации'
                    value={reposListStore.organizationName}
                    onChange={onInputChange} />
                <Button
                    disabled={reposListStore.meta === Meta.loading}
                    onClick={searchRepo}
                    children={<SearchIcon />} />
            </div>
            <ErrorMessage text={reposListStore.error} disabled={reposListStore.meta !== Meta.error} />
            <div>
                <ReposList />
            </div>
        </div>
    </div>
}

export default observer(ReposSearchPage);
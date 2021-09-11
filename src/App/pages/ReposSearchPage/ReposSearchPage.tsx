import React, { useState } from 'react'

import Button from '@components/Button'
import ErrorMessage from '@components/ErrorMessage'
import Input from '@components/Input'
import ReposList from '@components/ReposList'
import SearchIcon from '@components/SearchIcon'
import './ReposSearchPage.css'
import getOrgReposList from '@root/RepoItems'
import { RepoItem } from '@store/types'
import { useHistory } from 'react-router-dom'

const ReposSearchPage = () => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [repoItems, setRepoItems] = useState<RepoItem[]>([]);
    const [error, setError] = useState('');

    const history = useHistory();

    const searchRepo = async () => {
        if (input === '') {
            setError('Строка поиска не должна быть пустой')
            return
        }
        setError('')
        setIsLoading(true);
        let repos = await getOrgReposList(input);
        if (repos.length === 0)
            setError('Репозитории не найдены')
        setRepoItems(repos);
        setIsLoading(false);
    }

    return <div>
        <div className='repos-search-list'>
            <div className='repos-search-list__header'>
                <Input
                    placeholder='Введите название организации'
                    value={input}
                    onChange={(value: string) => setInput(value)} />
                <Button
                    disabled={isLoading}
                    onClick={searchRepo}
                    children={<SearchIcon />} />
            </div>
            <ErrorMessage text={error} disabled={error === ''} />
            <div>
                <ReposList repos={repoItems} onClick={(repo: RepoItem) => { history.push(`/repo/${repo.owner.login}/${repo.name}`) }} />
            </div>
        </div>
    </div>
}

export default ReposSearchPage;
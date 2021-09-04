import React, { useState } from 'react'

import Button from '@components/Button'
import ErrorMessage from '@components/ErrorMessage'
import Input from '@components/Input'
import RepoBranchDrawer from '@components/RepoBranchDrawer'
import ReposList from '@components/ReposList'
import SearchIcon from '@components/SearchIcon'
import './ReposSearchPage.css'
import getOrgReposList from '@root/RepoItems'
import { RepoItem } from '@store/types'

const ReposSearchPage = () => {
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [repoItems, setRepoItems] = useState([] as RepoItem[])
    const [error, setError] = useState('')
    const [selectedRepo, setSelectedRepo] = useState(null as RepoItem | null)

    return <div>
        <div className='repos-search-list'>
            <div className='repos-search-list__header'>
                <Input
                    placeholder='Введите название организации'
                    value={input}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value)} />
                <Button
                    disabled={isLoading}
                    onClick={() => {
                        if (input === '') {
                            setError('Строка поиска не должна быть пустой')
                            return
                        }
                        setError('')
                        setIsLoading(true);
                        getOrgReposList(input).then((repos: RepoItem[]) => {
                            if (repos.length === 0)
                                setError('Репозитории не найдены')
                            setRepoItems(repos);
                            setIsLoading(false);
                        })
                    }}
                    children={<SearchIcon />} />
            </div>
            <ErrorMessage text={error} disabled={error === ''} />
            <div>
                <ReposList repos={repoItems} onClick={(e) => {
                    const repoID = e.currentTarget.getAttribute('data-key')

                    if (repoID == null)
                        setSelectedRepo(null)
                    else
                        setSelectedRepo(repoItems.filter((repo) => repo.id === +repoID)[0])
                }} />
            </div>
        </div>
        <RepoBranchDrawer selectedRepo={selectedRepo} onClose={() => { setSelectedRepo(null) }} />
    </div>
}

export default ReposSearchPage;
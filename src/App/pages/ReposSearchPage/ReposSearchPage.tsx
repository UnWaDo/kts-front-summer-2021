import { useContext, useState } from 'react'

import Button from '@components/Button'
import ErrorMessage from '@components/ErrorMessage'
import Input from '@components/Input'
import ReposContext from '@components/ReposContext'
import ReposList from '@components/ReposList'
import SearchIcon from '@components/SearchIcon'
import { RepoItem } from '@store/types'
import { useHistory } from 'react-router-dom'

import styles from './ReposSearchPage.module.scss'

const ReposSearchPage = () => {
    const context = useContext(ReposContext);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    const searchRepo = () => {
        if (input === '') {
            setError('Строка поиска не должна быть пустой');
            return;
        }
        setError('');
        context.loadFirst(input);
    }

    return <div>
        <div className={styles['repos-search-list']}>
            <div className={styles['repos-search-list__header']}>
                <Input
                    placeholder='Введите название организации'
                    value={input}
                    onChange={(value: string) => setInput(value)} />
                <Button
                    disabled={context.isLoading}
                    onClick={searchRepo}
                    children={<SearchIcon />} />
            </div>
            <ErrorMessage text={error} disabled={error === ''} />
            <div>
                <ReposList
                    organizationName={input}
                    onClick={
                        (repo: RepoItem) => {
                            history.push(`/repo/${repo.owner.login}/${repo.name}`)
                        }
                    } />
            </div>
        </div>
    </div>
}

export default ReposSearchPage;
import React from 'react';

import RepoTile from '@components/RepoTile';
import { RepoItem } from '@store/types';
import './ReposList.css'
import { Link } from 'react-router-dom'

type ReposListProps = {
    repos: RepoItem[],
    onClick: (repo: RepoItem) => void
}

const ReposList: React.FC<ReposListProps> = ({ repos, onClick }) => {

    const repoTiles = repos.map((repo: RepoItem) => {
        return <Link to={`/repo/${repo.owner.login}/${repo.name}`}>
            <RepoTile key={repo.id} repo={repo} onClick={onClick} />
        </Link>
    });
    return <>{repoTiles}</>;
}

export default ReposList;
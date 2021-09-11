import React from 'react';

import RepoTile from '@components/RepoTile';
import { RepoItem } from '@store/types';
import './ReposList.css'

type ReposListProps = {
    repos: RepoItem[],
    onClick: (repo: RepoItem) => void
}

const ReposList: React.FC<ReposListProps> = ({ repos, onClick }) => {

    const repoTiles = repos.map((repo: RepoItem) => {
        return <RepoTile key={repo.id} repo={repo} onClick={onClick} />
    });
    return <>{repoTiles}</>;
}

export default ReposList;
import React from 'react';

import Avatar from '@components/Avatar';
import StarIcon from '@components/StarIcon';
import dayjs from 'dayjs'
import { RepoItem } from 'src/store/types';
import './RepoTile.css'

type RepoTileProps = {
    repo: RepoItem,
    onClick: (repo: RepoItem) => void
}

const RepoTile: React.FC<RepoTileProps> = ({ repo, onClick }) => {
    const handleClick = () => {
        onClick(repo);
    }

    return <div className="repo-tile" onClick={handleClick}>
        <Avatar src={repo.owner.avatar_url} letter={repo.name[0]} alt={repo.owner.login} />
        <div className="repo-tile__description">
            <div className="repo-tile__title">
                {repo.name}
            </div>
            <div className="repo-tile__company">
                {repo.owner.login}
            </div>
            <div className="repo-tile__details">
                <span className="repo-tile__stars"><StarIcon />{repo.stargazers_count}</span>
                <span className="repo-tile__updated">{dayjs(repo.updated_at).format('DD MMM')}</span>
            </div>
        </div>
    </div>
}

export default RepoTile;
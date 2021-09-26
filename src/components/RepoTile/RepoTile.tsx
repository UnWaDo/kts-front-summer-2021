import React from 'react';

import Avatar from '@components/Avatar';
import StarIcon from '@components/StarIcon';
import { RepoItem } from '@store/models/RepoItem';
import dayjs from 'dayjs'
import { useHistory } from 'react-router';

import styles from './RepoTile.module.scss';

type RepoTileProps = {
    repo: RepoItem
}

const RepoTile: React.FC<RepoTileProps> = ({ repo }) => {
    const history = useHistory();
    const handleClick = () => {
        history.push(`/repo/${repo.owner.login}/${repo.name}`);
    }

    return <div className={styles['repo-tile']} onClick={handleClick}>
        <Avatar src={repo.owner.avatar_url} letter={repo.name[0]} alt={repo.owner.login} />
        <div className={styles['repo-tile__description']}>
            <div className={styles['repo-tile__title']}>
                {repo.name}
            </div>
            <div className={styles['repo-tile__company']}>
                {repo.owner.login}
            </div>
            <div className={styles['repo-tile__details']}>
                <span className={styles['repo-tile__stars']}><StarIcon />{repo.stargazers_count}</span>
                <span className={styles['repo-tile__updated']}>{dayjs(repo.updated_at).format('DD MMM')}</span>
            </div>
        </div>
    </div>
}

export default React.memo(RepoTile);
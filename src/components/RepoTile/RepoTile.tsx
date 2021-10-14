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
    const handleClick = React.useCallback(() => {
        history.push(`/repo/${repo.owner_login}/${repo.name}`);
    }, [repo, history]);

    return <div className={styles['repo-tile']} onClick={handleClick}>
        <Avatar src={repo.owner_avatar} letter={repo.name[0].toUpperCase()} alt={repo.owner_login} />
        <div className={styles['repo-tile__description']}>
            <div className={styles['repo-tile__title']}>
                {repo.name}
            </div>
            <div className={styles['repo-tile__company']}>
                {repo.owner_login}
            </div>
            <div className={styles['repo-tile__details']}>
                <span className={styles['repo-tile__stars']}><StarIcon />{repo.stargazers_count}</span>
                <span className={styles['repo-tile__updated']}>{dayjs(repo.updated_at).format('DD MMM')}</span>
            </div>
        </div>
    </div>
}

export default React.memo(RepoTile);
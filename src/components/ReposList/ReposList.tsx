import React, { useContext } from 'react';

import ReposContext from '@components/ReposContext';
import RepoTile from '@components/RepoTile';
import { RepoItem } from '@store/types';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './ReposList.module.scss';

type ReposListProps = {
    organizationName: string,
    onClick: (repo: RepoItem) => void
}

const ReposList: React.FC<ReposListProps> = ({ organizationName, onClick }) => {
    const context = useContext(ReposContext);

    const loadNextRepos = () => {
        context.loadNext(organizationName, context);
    }

    const repoTiles = context.repos.map((repo: RepoItem) => {
        return <RepoTile key={repo.id} repo={repo} onClick={onClick} />
    });
    let endMessage;
    if (context.repos.length === 0)
        endMessage = <p className={styles['error']}>Репозитории не найдены</p>;
    else
        endMessage = <p className={styles['ender']}>Список репозиториев закончился, всего загружено: {context.repos.length}</p>;
    return <InfiniteScroll
        dataLength={context.repos.length}
        next={loadNextRepos}
        hasMore={context.hasMore}
        loader={
            <p className={styles['loader']}>
                Загрузка...
            </p>
        }
        endMessage={endMessage}
    >
        {repoTiles}
    </InfiniteScroll>;
}

export default ReposList;
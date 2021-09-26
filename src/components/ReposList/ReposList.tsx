import React, { useContext } from 'react';

import ReposContext from '@components/ReposContext';
import RepoTile from '@components/RepoTile';
import { RepoItem } from '@store/models/RepoItem';
import { Meta } from '@utils/meta';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './ReposList.module.scss';

const ReposList: React.FC = () => {
    const context = useContext(ReposContext);
    const reposListStore = context.reposListStore;

    let endMessage;
    switch (reposListStore.meta) {
        case Meta.error:
            endMessage = <p className={styles['error']}>Репозитории не найдены</p>;
            break;
        case Meta.loading:
            endMessage = <p className={styles['loader']}>Загрузка...</p>;
            break;
        case Meta.success:
            endMessage = <p className={styles['ender']}>Список репозиториев закончился, всего загружено: {reposListStore.repos.length}</p>;
            break;
    }

    return <InfiniteScroll
        dataLength={reposListStore.repos.length}
        next={reposListStore.loadReposNext}
        hasMore={reposListStore.hasMore}
        loader={
            <p className={styles['loader']}>
                Загрузка...
            </p>
        }
        endMessage={endMessage}
    >
        {
            reposListStore.repos.map((repo: RepoItem) => {
                return <RepoTile key={repo.id} repo={repo} />
            })
        }
    </InfiniteScroll>;
}

export default ReposList;
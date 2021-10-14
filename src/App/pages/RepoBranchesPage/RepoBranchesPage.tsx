import React from 'react'

import RepoBranchInfo from '@components/RepoBranchInfo'
import RepoBranchesStore from '@store/RepoBranchesStore';
import { Meta } from '@utils/meta';
import { useLocalStore } from '@utils/useLocalStore';
import { Drawer } from 'antd'
import 'antd/dist/antd.css';
import { observer } from 'mobx-react-lite';
import { useParams, useHistory } from 'react-router-dom'

import styles from './RepoBranchesPage.module.scss'

type RepoBranchPageParams = {
    owner: string,
    name: string
}

const RepoBranchesPage = () => {
    const { owner, name } = useParams<RepoBranchPageParams>();
    const repoBranchesStore = useLocalStore(() => new RepoBranchesStore(owner, name))

    const history = useHistory();

    if (repoBranchesStore.meta === Meta.initial)
        repoBranchesStore.loadBranches();

    const handleClose = React.useCallback(() => history.goBack(), [history]);

    return <Drawer className={styles['repo-branch-drawer']} placement='right' visible={true} onClose={handleClose}>
        <h3>
            Ветки репозитория
            <br />
            <i>{name}</i>
            <br />
            компании
            <br />
            <i>{owner}</i>
        </h3>
        <div>
            {repoBranchesStore.meta === Meta.loading ? <p>Загрузка...</p> : <RepoBranchInfo branches={repoBranchesStore.branches} />}
        </div>
    </Drawer>
}

export default observer(RepoBranchesPage);
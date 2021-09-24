import { useEffect, useState } from 'react'
import React from 'react'

import RepoBranchInfo from '@components/RepoBranchInfo'
import getRepoBranchesList from '@root/BranchItems'
import { RepoBranch } from '@store/types'
import { Drawer } from 'antd'
import { useParams } from 'react-router-dom'
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom'

import styles from './RepoBranchesPage.module.scss'

type RepoBranchPageParams = {
    owner: string,
    name: string
}

const RepoBranchesPage = () => {
    const { owner, name } = useParams<RepoBranchPageParams>();
    const [loaded, setLoaded] = useState(false);
    const [branches, setBranches] = useState<RepoBranch[]>([]);

    const history = useHistory();

    const handleClose = React.useCallback(() => history.goBack(), [history]);

    const loadBranches = async () => {
        let branches = await getRepoBranchesList(owner, name);
        setLoaded(true);
        setBranches(branches);
    }

    useEffect(() => {
        if (!loaded)
            loadBranches()
    });

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
            <RepoBranchInfo branches={branches} />
        </div>
    </Drawer>
}

export default RepoBranchesPage;
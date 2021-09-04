import React, { useState } from 'react'

import RepoBranchInfo from '@components/RepoBranchInfo'
import getRepoBranchesList from '@root/BranchItems'
import { RepoBranch, RepoItem } from '@store/types'
import { Drawer } from 'antd'
import 'antd/dist/antd.css';
import './RepoBranchDrawer.css'

type RepoBranchDrawerProps = {
    selectedRepo: RepoItem | null,
    onClose: () => void
}

const RepoBranchDrawer: React.FC<RepoBranchDrawerProps> = ({ selectedRepo, onClose }) => {
    const [branches, setBranches] = useState([] as RepoBranch[])
    const [loaded, setLoaded] = useState(selectedRepo?.id)

    if (selectedRepo !== null && loaded !== selectedRepo.id) {
        getRepoBranchesList(selectedRepo.owner.login, selectedRepo.name).then((branches) => {
            setBranches(branches);
            setLoaded(selectedRepo.id);
        })
    }
    return <Drawer width='400px' className='repo-branch-drawer' placement='right' visible={selectedRepo !== null} onClose={onClose}>
        <h3>
            Ветки репозитория
            <br />
            <i>{selectedRepo?.name}</i>
            <br />
            компании
            <br />
            <i>{selectedRepo?.owner.login}</i>
        </h3>
        <div>
            <RepoBranchInfo branches={branches} />
        </div>
    </Drawer>
}

export default RepoBranchDrawer;
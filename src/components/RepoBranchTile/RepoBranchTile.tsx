import React from 'react';

import { RepoBranch } from '@store/types';

import styles from './RepoBranchTile.module.scss';

type RepoBranchProps = {
    branch: RepoBranch
}

const RepoBranchTile: React.FC<RepoBranchProps> = ({ branch }) => {
    return <div className={styles['repo-branch-tile'] + (branch.protected ? ' ' + styles['repo-branch-tile-protected'] : '')} >
        <div className={styles['repo-branch-tile__branch-name']}>
            {branch.name}
        </div>
        <div className={styles['repo-branch-tile__commit-info']}>
            Commit sha: <a href={branch.commit.url}> {branch.commit.sha} </a>
        </div>
    </div>
}

export default React.memo(RepoBranchTile);
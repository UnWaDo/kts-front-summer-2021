import React from 'react'

import { RepoBranch } from '@store/types'
import './RepoBranchTile.css'

type RepoBranchProps = {
    branch: RepoBranch
}

const RepoBranchTile: React.FC<RepoBranchProps> = ({ branch }) => {
    return <div className={'repo-branch-tile' + (branch.protected ? ' repo-branch-tile-protected' : '')} >
        <div className='repo-branch-tile__branch-name'>
            {branch.name}
        </div>
        <div className='repo-branch-tile__commit-info'>
            Commit sha: <a href={branch.commit.url}> {branch.commit.sha} </a>
        </div>
    </div>
}

export default RepoBranchTile;
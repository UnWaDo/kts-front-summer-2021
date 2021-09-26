import React from 'react';

import RepoBranchTile from '@components/RepoBranchTile';
import { RepoBranch } from '@store/models/RepoBranch';

type RepoBranchesProps = {
    branches: RepoBranch[]
}

const RepoBranches: React.FC<RepoBranchesProps> = ({ branches }) => {
    const branchTiles = branches.map((branch: RepoBranch) => {
        return <RepoBranchTile key={branch.name} branch={branch} />
    })
    return <>{branchTiles}</>
}

export default RepoBranches;
import React from 'react';

import RepoBranchTile from '@components/RepoBranchTile';
import { RepoBranch } from '@store/types';

type RepoBranchInfoProps = {
    branches: RepoBranch[]
}

const RepoBranches: React.FC<RepoBranchInfoProps> = ({ branches }) => {
    const branchTiles = branches.map((branch: RepoBranch) => {
        return <RepoBranchTile key={branch.name} branch={branch} />
    })
    return <>{branchTiles}</>
}

export default RepoBranches;
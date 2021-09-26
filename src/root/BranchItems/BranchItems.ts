import { RepoBranch } from '@store/models/RepoBranch';
import GitHubStore from '@store/GitHubStore'

const getRepoBranchesList = (ownerName: string, repositoryName: string): Promise<RepoBranch[]> => {
    const gitHubStore = new GitHubStore();

    return gitHubStore.getRepoBranchesList({
        ownerName: ownerName,
        repositoryName: repositoryName
    }).then(result => {
        if (result.success)
            return result.data;
        else
            return [];
    }).catch(() => []);
}

export default getRepoBranchesList;
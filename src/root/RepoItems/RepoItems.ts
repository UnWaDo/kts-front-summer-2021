import GitHubStore from '@store/GitHubStore'
import { RepoItem } from '@store/types';

const getOrgReposList = (organization: string): Promise<RepoItem[]> => {
    const gitHubStore = new GitHubStore();

    return gitHubStore.getOrganizationReposList({
        organizationName: organization
    }).then(result => {
        if (result.success)
            return result.data;
        else
            return [];
    }).catch(() => []);
}

export default getOrgReposList;
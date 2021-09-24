import GitHubStore from '@store/GitHubStore'
import { RepoItem } from '@store/types';

const getOrgReposList = async (organization: string, per_page?: number, page?: number): Promise<RepoItem[]> => {
    const gitHubStore = new GitHubStore();

    let result = await gitHubStore.getOrganizationReposList({
        organizationName: organization,
        per_page: per_page,
        page: page
    });
    if (result.success)
        return result.data;
    else
        return [];
}

export default getOrgReposList;
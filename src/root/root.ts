// Здесь необходимо продемонстрировать создание и использование GitHubStore
import dayjs from 'dayjs';
import GitHubStore from '../store/GitHubStore';

const gitHubStore = new GitHubStore();

const EXAMPLE_ORGANIZATION = 'ktsstudio';

gitHubStore.getOrganizationReposList({
    organizationName: EXAMPLE_ORGANIZATION
}).then(result => {
    if (result.success) {
        for (let i = 0; i < result.data.length; i++) {
            console.log(`Repository name: ${result.data[i].name}
                Owner: ${result.data[i].owner.login}
                Stars: ${result.data[i].stargazers_count}
                Last update: ${dayjs(result.data[i].updated_at).format("DD MMM")}`
            );
        }
    }
    else {
        console.log(result.data.message);
    }
})

// Функция извлечения массива RepoItem перенесена в @root/RepoItems
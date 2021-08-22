// Здесь необходимо продемонстрировать создание и использование GitHubStore

import GitHubStore from '../store/GitHubStore';

const gitHubStore = new GitHubStore();

const EXAMPLE_ORGANIZATION = 'ktsstudio';

gitHubStore.getOrganizationReposList({
    organizationName: EXAMPLE_ORGANIZATION
}).then(result => {
    console.log(result);
})

// В ДЗ 1 Не требуется визуально в разметке отображать результат запроса к сети. Достаточно вывести в console.log
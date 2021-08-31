// Здесь необходимо продемонстрировать создание и использование GitHubStore
import dayjs from 'dayjs';
import GitHubStore from '../store/GitHubStore';
import { RepoItem } from '../store/types';

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

export function getOrgReposList(organization: string): Promise<RepoItem[]> {
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

// В ДЗ 1 Не требуется визуально в разметке отображать результат запроса к сети. Достаточно вывести в console.log
// Фактически я сделал визуальный вывод, но на всякий случай убирать console.log не стал
// В начале у меня сгорел мозг от происходящего, но надеюсь, что я сделал это не совсем бредово
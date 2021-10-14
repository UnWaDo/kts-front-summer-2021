import GitHubStore from "@store/GitHubStore";
import { RepoItem, repoItemNormalizer } from "@store/models/RepoItem";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore"
import { action, computed, makeObservable, observable, runInAction } from "mobx";

type PrivateFields = "_repos" | "_meta" | "_hasMore" | "_page" | "_error" | "_organizationName";

export default class ReposListStore implements ILocalStore {
    private _gitHubStore: GitHubStore;
    private _meta: Meta = Meta.initial;
    private _organizationName: string = '';
    private _error: string = '';
    private _repos: RepoItem[] = [];
    private _hasMore: boolean = false;

    private _perPage: number;
    private _page: number;

    constructor(perPage: number = 10) {
        makeObservable<ReposListStore, PrivateFields>(this, {
            _repos: observable.ref,
            _hasMore: observable,
            _meta: observable,
            _page: observable,
            _error: observable,
            _organizationName: observable,
            loadReposFirst: action,
            loadReposNext: action,
            setOrganizationName: action,
            perPage: computed,
            repos: computed,
            hasMore: computed,
            meta: computed,
            organizationName: computed,
            error: computed
        });
        this._gitHubStore = new GitHubStore();
        this._perPage = perPage;
        this._page = 1;
    }

    get perPage() { return this._perPage; }
    get repos() { return this._repos; }
    get hasMore() { return this._hasMore; }
    get meta() { return this._meta; }
    get error() { return this._error; }
    get organizationName() { return this._organizationName; }

    setOrganizationName = (organizationName: string) => {
        this._organizationName = organizationName;
        this._meta = Meta.initial;
        this._error = '';
    }

    loadReposFirst = async () => {
        if (this._organizationName === '') {
            this._meta = Meta.error;
            this._error = 'Название организации не должно быть пустым';
            return;
        }
        this._meta = Meta.loading;
        this._repos = [];
        this._page = 1;
        try {
            let result = await this._gitHubStore.getOrganizationReposList({
                organizationName: this._organizationName,
                per_page: this._perPage
            });
            runInAction(() => {
                if (result.success) {
                    this._repos = result.data.map(repoItemNormalizer);
                    this._hasMore = this._repos.length >= this._perPage;
                    this._meta = Meta.success;
                }
                else {
                    this._meta = Meta.error;
                    this._error = 'Репозитории не найдены';
                }
            });
        } catch {
            runInAction(() => {
                this._meta = Meta.error;
                this._error = 'Ошибка при загрузке репозиториев';
            });
            return;
        }
    }

    loadReposNext = async () => {
        this._meta = Meta.loading;
        try {
            let result = await this._gitHubStore.getOrganizationReposList({
                organizationName: this._organizationName,
                per_page: this._perPage,
                page: ++this._page
            });
            runInAction(() => {
                let newRepos: RepoItem[];
                if (result.success) {
                    newRepos = result.data.map(repoItemNormalizer);
                    this._meta = Meta.success;
                }
                else {
                    newRepos = [];
                    this._meta = Meta.error;
                }
                this._repos = this._repos.slice().concat(newRepos);
                this._hasMore = newRepos.length >= this._perPage;
            });
        } catch {
            this._meta = Meta.error;
        }
    }

    destroy() { }
}
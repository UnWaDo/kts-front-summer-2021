import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/models/RepoItem";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore"
import { action, computed, makeObservable, observable, runInAction } from "mobx";

type PrivateFields = "_repos" | "_meta" | "_hasMore";

export default class ReposListStore implements ILocalStore {
    private _gitHubStore: GitHubStore;
    private _meta: Meta = Meta.initial;
    private _organizationName: string = '';
    private _repos: RepoItem[] = [];
    private _hasMore: boolean = false;

    private _perPage: number;

    constructor(perPage: number = 10) {
        makeObservable<ReposListStore, PrivateFields>(this, {
            _repos: observable.ref,
            _hasMore: observable,
            _meta: observable,
            loadReposFirst: action,
            loadReposNext: action,
            perPage: computed,
            repos: computed,
            hasMore: computed,
            meta: computed
        });
        this._gitHubStore = new GitHubStore();
        this._perPage = perPage;
    }

    get perPage() { return this._perPage; }
    get repos() { return this._repos; }
    get hasMore() { return this._hasMore; }
    get meta() { return this._meta; }

    loadReposFirst = async (organizationName: string) => {
        this._organizationName = organizationName;
        this._meta = Meta.loading;
        this._repos = [];
        let result = await this._gitHubStore.getOrganizationReposList({
            organizationName: this._organizationName,
            per_page: this._perPage
        });
        runInAction(() => {
            if (result.success) {
                this._repos = result.data;
                this._hasMore = this._repos.length >= this._perPage;
                this._meta = Meta.success;
            }
            else
                this._meta = Meta.error;
        });
    }

    loadReposNext = async () => {
        this._meta = Meta.loading;
        let page = Math.floor(this._repos.length / this._perPage) + 1;
        let result = await this._gitHubStore.getOrganizationReposList({
            organizationName: this._organizationName,
            per_page: this._perPage,
            page: page
        });
        runInAction(() => {
            let newRepos: RepoItem[];
            if (result.success) {
                newRepos = result.data;
                this._meta = Meta.success;
            }
            else {
                newRepos = [];
                this._meta = Meta.error;
            }
            this._repos = this._repos.slice().concat(newRepos);
            this._hasMore = newRepos.length >= this._perPage;
        });
    }

    destroy() { }
}
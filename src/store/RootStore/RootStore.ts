import GitHubStore from "@store/GitHubStore";
import { RepoBranch } from "@store/models/RepoBranch";
import { RepoItem } from "@store/models/RepoItem";
import { Meta } from "@utils/meta";
import { action, computed, makeObservable, observable } from "mobx";

interface IRootStore {
    loadReposFirst: (organizationName: string) => void;
    loadReposNext: () => void;
}

type PrivateFields = "_branches" | "_repos" | "_meta" | "_hasMore";

export default class RootStore implements IRootStore {
    private _gitHubStore: GitHubStore;
    private _organizationName = '';
    private _perPage: number = 10;
    private _branches: Array<RepoBranch> = [];
    private _repos: Array<RepoItem> = [];
    private _meta: Meta = Meta.initial;
    private _hasMore: boolean = false;

    constructor(perPage: number = 10) {
        makeObservable<RootStore, PrivateFields>(this, {
            _branches: observable,
            _repos: observable,
            _meta: observable,
            _hasMore: observable,
            loadReposFirst: action,
            loadReposNext: action,
            perPage: computed,
            repos: computed,
            branches: computed,
            meta: computed,
            hasMore: computed
        });
        this._gitHubStore = new GitHubStore();
        this._perPage = perPage;
    }

    get perPage() { return this._perPage; }
    get repos() { return this._repos; }
    get branches() { return this._branches; }
    get meta() { return this._meta; }
    get hasMore() { return this._hasMore; }

    loadReposFirst = async (organizationName: string) => {
        this._organizationName = organizationName;
        // this._meta = Meta.loading;
        let result = await this._gitHubStore.getOrganizationReposList({
            organizationName: this._organizationName,
            per_page: this._perPage
        });
        let newRepos: Array<RepoItem>;
        if (result.success)
            newRepos = result.data;
        else
            newRepos = [];
        this._repos = newRepos;
        // this._meta = Meta.ok;
        this._hasMore = newRepos.length >= this._perPage;
    }

    loadReposNext = async () => {
        this._meta = Meta.loading;
        let page = Math.floor(this._repos.length / this._perPage) + 1;
        let result = await this._gitHubStore.getOrganizationReposList({
            organizationName: this._organizationName,
            per_page: this._perPage,
            page: page
        });
        let newRepos: Array<RepoItem>;
        if (result.success)
            newRepos = result.data;
        else
            newRepos = [];
        this._repos = this._repos.slice().concat(newRepos);
        this._meta = Meta.success;
        this._hasMore = newRepos.length >= this._perPage;
    }

    loadBranches = async (repositoryName: string) => {
        this._meta = Meta.loading;

        let result = await this._gitHubStore.getRepoBranchesList({
            ownerName: this._organizationName,
            repositoryName: repositoryName
        });
        if (result.success)
            this._branches = result.data;
        else
            this._branches = [];
        this._meta = Meta.success;
    }
}

export const rootStore = new RootStore(10);
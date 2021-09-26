import GitHubStore from "@store/GitHubStore";
import { RepoBranch } from "@store/models/RepoBranch";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore"
import { action, computed, makeObservable, observable, runInAction } from "mobx";

type PrivateFields = "_branches" | "_meta";

export default class RepoBranchesStore implements ILocalStore {
    private _gitHubStore: GitHubStore;
    private _meta: Meta = Meta.initial;
    private _owner: string;
    private _repositoryName: string;
    private _branches: RepoBranch[] = [];

    constructor(owner: string, repositoryName: string) {
        makeObservable<RepoBranchesStore, PrivateFields>(this, {
            _branches: observable.ref,
            _meta: observable,
            loadBranches: action,
            branches: computed,
            meta: computed
        });
        this._owner = owner;
        this._repositoryName = repositoryName;
        this._gitHubStore = new GitHubStore();
    }

    get branches() { return this._branches; }
    get meta() { return this._meta; }

    loadBranches = async () => {
        this._meta = Meta.loading;
        this._branches = [];
        let result = await this._gitHubStore.getRepoBranchesList({
            ownerName: this._owner,
            repositoryName: this._repositoryName
        });
        runInAction(() => {
            if (result.success) {
                this._branches = result.data;
                this._meta = Meta.success;
            }
            else
                this._meta = Meta.error;
        });
    }

    destroy() { }
}
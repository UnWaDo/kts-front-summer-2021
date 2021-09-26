export type RepoBranch = {
    name: string,
    commit: {
        sha: string,
        url: string
    };
    protected: boolean
}
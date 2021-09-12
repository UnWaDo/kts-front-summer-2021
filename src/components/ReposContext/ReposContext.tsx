import { createContext } from "react";

import { RepoItem } from "@store/types";

export type ReposContextType = {
    repos: RepoItem[],
    isLoading: boolean,
    loadFirst: (org: string, currentContext: ReposContextType) => void,
    per_page: number,
    hasMore: boolean,
    loadNext: (org: string, currentContext: ReposContextType) => void
}

const ReposContext = createContext<ReposContextType>({
    repos: [],
    isLoading: false,
    loadFirst: () => { },
    per_page: 10,
    hasMore: false,
    loadNext: () => { }
});

export default ReposContext;
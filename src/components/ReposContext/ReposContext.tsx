import { createContext } from "react";

import { RepoItem } from "@store/types";

export type ReposContextType = {
    repos: RepoItem[],
    isLoading: boolean,
    load: (org: string) => void
}

const ReposContext = createContext<ReposContextType>({
    repos: [],
    isLoading: false,
    load: () => { }
});

export default ReposContext;
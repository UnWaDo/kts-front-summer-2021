import { createContext } from "react";

import ReposListStore from "@store/ReposListStore";

export type ReposContextType = {
    reposListStore: ReposListStore
}

const ReposContext = createContext<ReposContextType>({
    reposListStore: new ReposListStore(10)
});

export default ReposContext;
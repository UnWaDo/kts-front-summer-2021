import { useState } from 'react';

import ReposContext, { ReposContextType } from '@components/ReposContext';
import getOrgReposList from '@root/RepoItems';
import { RepoItem } from '@store/types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import RepoBranchesPage from './pages/RepoBranchesPage';
import ReposSearchPage from './pages/ReposSearchPage';

function App() {
    const loadReposFirst = async (org: string) => {
        setIsLoading(true);
        const newRepos = await getOrgReposList(org, context.per_page);
        setRepos(newRepos);
        setIsLoading(false);
        setHasMore(newRepos.length >= perPage);
    }

    const loadReposNext = async (org: string, currentContext: ReposContextType) => {
        const page = Math.floor(currentContext.repos.length / currentContext.per_page) + 1;
        setIsLoading(true);
        const newRepos = await getOrgReposList(org, context.per_page, page);
        setRepos(repos.concat(newRepos));
        setIsLoading(false);
        setHasMore(newRepos.length >= perPage);
    }

    const [repos, setRepos] = useState<RepoItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const perPage = 10;

    const context = {
        repos: repos,
        isLoading: isLoading,
        loadFirst: loadReposFirst,
        loadNext: loadReposNext,
        per_page: perPage,
        hasMore: hasMore
    };

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/repos'>
                    <ReposContext.Provider value={context}>
                        <ReposSearchPage />
                    </ReposContext.Provider>
                </Route>
                <Route path='/repo/:owner/:name' component={RepoBranchesPage} />
                <Redirect to='/repos' />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
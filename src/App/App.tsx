import { useState } from 'react';

import ReposContext, { ReposContextType } from '@components/ReposContext';
import getOrgReposList from '@root/RepoItems';
import { RepoItem } from '@store/types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import RepoBranchesPage from './pages/RepoBranchesPage';
import ReposSearchPage from './pages/ReposSearchPage';

function App() {
    const load = async (org: string, start: RepoItem[], page?: number) => {
        setContext({
            repos: start,
            isLoading: true,
            loadFirst: context.loadFirst,
            loadNext: context.loadNext,
            per_page: context.per_page,
            hasMore: context.hasMore
        });
        const newRepos = await getOrgReposList(org, context.per_page, page);
        setContext({
            repos: start.concat(newRepos),
            isLoading: false,
            loadFirst: context.loadFirst,
            loadNext: context.loadNext,
            per_page: context.per_page,
            hasMore: newRepos.length >= context.per_page
        });
    }
    const loadReposFirst = (org: string, currentContext: ReposContextType) => {
        load(org, []);
    }

    const loadReposNext = (org: string, currentContext: ReposContextType) => {
        const page = Math.floor(currentContext.repos.length / currentContext.per_page) + 1;
        load(org, currentContext.repos, page);
    }

    const [context, setContext] = useState<ReposContextType>({
        repos: [],
        isLoading: false,
        loadFirst: loadReposFirst,
        loadNext: loadReposNext,
        per_page: 10,
        hasMore: false
    })

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/repos'>
                    <ReposContext.Provider value={context}>
                        <ReposSearchPage />
                    </ReposContext.Provider>
                </Route>
                <Route path='/repo/:owner/:name' component={RepoBranchesPage} />
                <Route path='*'>
                    <Redirect to='/repos' />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
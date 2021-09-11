import { useState } from 'react';

import ReposContext, { ReposContextType } from '@components/ReposContext';
import getOrgReposList from '@root/RepoItems';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import './App.css';
import RepoBranchesPage from './pages/RepoBranchesPage';
import ReposSearchPage from './pages/ReposSearchPage';

function App() {
    const loadRepos = async (org: string) => {
        setContext({
            repos: [],
            isLoading: true,
            load: () => { }
        });
        const repos = await getOrgReposList(org);
        setContext({
            repos: repos,
            isLoading: false,
            load: (org: string) => loadRepos(org)
        });
    }

    const [context, setContext] = useState<ReposContextType>({
        repos: [],
        isLoading: false,
        load: (org: string) => loadRepos(org)
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
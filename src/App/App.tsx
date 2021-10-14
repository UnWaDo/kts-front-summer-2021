import ReposContext from '@components/ReposContext';
import ReposListStore from '@store/ReposListStore';
import { useLocalStore } from '@utils/useLocalStore';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import RepoBranchesPage from './pages/RepoBranchesPage';
import ReposSearchPage from './pages/ReposSearchPage';

function App() {
    const perPage = 10;
    const reposListStore = useLocalStore(() => new ReposListStore(perPage));

    const context = {
        reposListStore: reposListStore
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
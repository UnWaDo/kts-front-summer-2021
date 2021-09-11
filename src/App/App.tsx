import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import './App.css';
import RepoBranchesPage from './pages/RepoBranchesPage';
import ReposSearchPage from './pages/ReposSearchPage';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/repos' component={ReposSearchPage} />
                <Route path='/repo/:owner/:name' component={RepoBranchesPage} />
                <Route path='*'>
                    <Redirect to='/repos' />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
import logo from './logo.svg';
import './App.css';
import './root/root';
import './layouts/style/repo_list_style.css'
import { RepoItem } from './store/types';
import React from 'react';
import { getOrgReposList } from './root/root'
import dayjs from 'dayjs';

function App() {
    return (
        <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
            Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
            </a>
        </header>
        <RepoSearch />
        </div>
    );
}

interface IProps {}
interface IState {
    repos: RepoItem[],
    orgName: string,
    searchError: string
};

export class RepoSearch extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            repos: new Array<RepoItem>(),
            orgName: "",
            searchError: ""
        };
        this.onSearch = this.onSearch.bind(this);
        this.onOrgInput = this.onOrgInput.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    onSearch(event: React.MouseEvent) {
        event.preventDefault();
        this.getReposList();
    }

    onOrgInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({orgName: String(event.target.value)});
    }

    onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter')
            this.getReposList();
    }

    getReposList() {
        if (this.state.orgName === "") {
            this.setState({searchError: "Введите поисковую строку"});
            return ;
        }
        getOrgReposList(this.state.orgName).then((reposList) => {
            if (reposList.length === 0)
                this.setState({
                    repos: reposList,
                    searchError: "Результатов не найдено"
                });
            else
                this.setState({
                    repos: reposList,
                    searchError: ""
                });
        });
    }

    render() {
        return (
            <div className="git-repo-list">
                <div className="git-repo-list__header">
                    <input
                        className="git-repo-list__search-input"
                        placeholder="Введите название организации"
                        onChange={this.onOrgInput}
                        onKeyPress={this.onKeyUp}
                    />
                    <button className="git-repo-list__search-button" onClick={this.onSearch} />
                </div>
                {
                        this.state.searchError !== "" ? 
                        <span className="git-repo-list__errors"> {this.state.searchError} </span> : 
                        ""
                    }
                <div className="git-repo-list__body">
                    {
                        this.state.repos.map(repo => <RepoCard key={repo.name} repo={repo} />)
                    }
                </div>
            </div>
        );
    }
}

export function RepoCard(props: {repo: RepoItem}) {
    return (
        <div className="git-repo-card">
            <div className="icon">
                {props.repo.owner.avatar_url !== "" ? 
                    <img className="icon__image" src={props.repo.owner.avatar_url} alt="Sample text" /> :
                    ""
                }
                {props.repo.owner.login.substr(0, 1)}
            </div>
            <div className="git-repo-card__description">
                <div className="git-repo-card__title">
                    {props.repo.name}
                </div>
                <div className="git-repo-card__company">
                    {props.repo.owner.login}
                </div>
                <div className="git-repo-card__details">
                    <span className="git-repo-card__stars">{props.repo.stargazers_count}</span>
                    <span className="git-repo-card__updated">Updated {dayjs(props.repo.updated_at).format("DD MMM")}</span>
                </div>
            </div>
        </div>
    );
}

export default App;
import { render, screen } from '@testing-library/react';
import { App, RepoSearch } from './App';
import { getOrgReposList } from './root/root';

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

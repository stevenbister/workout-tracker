import { render, screen } from '@testing-library/react';
import App from './App.tsx';

it('renders the app', () => {
    render(<App />);
    expect(screen.getByRole('button')).toBeInTheDocument();
});

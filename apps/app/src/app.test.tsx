import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import App from './App.tsx';

it('renders the app', () => {
    render(<App />);
    expect(screen.getByRole('button')).toBeInTheDocument();
});

it('increments the counter on click', async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('count is 0');

    await user.click(button);

    expect(button).toHaveTextContent('count is 1');
});

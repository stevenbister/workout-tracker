import userEvent from '@testing-library/user-event';

import { authClient } from '@repo/core/auth/client';

import { render, screen } from '@repo/ui/tests/utils';

import { ROUTES } from '@/constants';
import data from '@/content/validation.json';

import { LoginForm } from './login-form';

vi.mock('@tanstack/react-router', () => ({
    useSearch: vi.fn(),
}));

vi.mock('@repo/core/auth/client', () => ({
    authClient: {
        signIn: {
            email: vi.fn(),
        },
    },
}));

const mockErrorMessage = 'Invalid credentials';

const setup = () => {
    vi.mocked(authClient.signIn.email).mockImplementation(
        ({ fetchOptions }) => {
            // @ts-expect-error -- only testing don't need everything
            fetchOptions?.onSuccess?.({
                data: {},
            });
            fetchOptions?.onError?.({
                // @ts-expect-error -- only testing don't need everything
                error: { message: mockErrorMessage },
            });
        }
    );

    return {
        user: userEvent.setup(),
        ...render(<LoginForm />),
    };
};

afterEach(() => vi.clearAllMocks());

it('renders the login form', () => {
    setup();

    expect(
        screen.getByRole('textbox', {
            name: 'Email',
        })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(
        screen.getByRole('button', {
            name: 'Log in',
        })
    ).toBeInTheDocument();
});

it('displays validation errors when email and password are empty', async () => {
    const { user } = setup();

    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
        data.email.empty
    );
    expect(screen.getByLabelText('Password')).toHaveAccessibleDescription(
        data.password.empty
    );
});

it('displays validation message when email is invalid', async () => {
    const { user } = setup();

    const emailInput = screen.getByLabelText('Email');

    await user.type(emailInput, 'invalid-email');
    await user.type(screen.getByLabelText('Password'), 'password');
    await user.click(screen.getByRole('button'));

    expect(emailInput).toHaveAccessibleDescription(data.email.invalid);
});

it('displays a form error when the form is submitted with invalid credentials', async () => {
    const { user } = setup();

    await user.type(screen.getByLabelText('Email'), 'test@test.com');
    await user.type(screen.getByLabelText('Password'), 'Password123');
    await user.click(screen.getByRole('button'));

    expect(
        screen.getByRole('region', {
            name: 'Notifications alt+T',
        })
    ).toBeInTheDocument();
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
});

it('calls signIn when the form is submitted with valid credentials', async () => {
    const { user } = setup();

    await user.type(screen.getByLabelText('Email'), 'test@test.com');
    await user.type(screen.getByLabelText('Password'), 'Password123');
    await user.click(screen.getByRole('button'));

    expect(authClient.signIn.email).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
            callbackURL: ROUTES.ROOT,
            email: 'test@test.com',
            password: 'Password123',
            fetchOptions: {
                onSuccess: expect.any(Function),
                onError: expect.any(Function),
                onRequest: expect.any(Function),
            },
        })
    );
});

it('clears validation errors when the form is submitted with valid credentials', async () => {
    const { user } = setup();

    const emailInput = screen.getByLabelText('Email');

    await user.type(emailInput, 'test@');
    await user.type(screen.getByLabelText('Password'), 'Password123');
    await user.click(screen.getByRole('button'));

    expect(emailInput).toHaveAccessibleDescription(data.email.invalid);

    await user.clear(emailInput);
    await user.type(emailInput, 'test@test.com');
    await user.type(screen.getByLabelText('Password'), 'Password123');
    await user.click(screen.getByRole('button'));

    expect(emailInput).not.toHaveAccessibleDescription(data.email.invalid);
});

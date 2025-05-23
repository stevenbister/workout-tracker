import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from '../../tests/utils';
import type { Status } from '../../types';
import type { ToastProps } from './toast';
import { toast } from './toast';

const toastTriggerText = 'Show toast';

const defaultProps: ToastProps = {
    id: 1,
    title: 'Toast',
    description: 'This is a toast',
};

const setup = (props?: Partial<ToastProps>) => ({
    user: userEvent.setup(),
    ...render(
        <button onClick={() => toast.render({ ...defaultProps, ...props })}>
            {toastTriggerText}
        </button>
    ),
});

beforeEach(() => (HTMLElement.prototype.setPointerCapture = vi.fn()));

it('renders the toast title and description', async () => {
    const { user } = setup();

    await user.click(screen.getByRole('button', { name: toastTriggerText }));

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description!)).toBeInTheDocument();
});

it('dismisses the toast when the close button is clicked', async () => {
    const { user } = setup({
        button: { onClick: () => void 0 },
    });

    await user.click(screen.getByRole('button', { name: toastTriggerText }));

    await user.click(
        screen.getByRole('button', {
            name: 'Dismiss toast',
        })
    );

    await waitFor(() =>
        expect(screen.queryByText(defaultProps.title)).not.toBeInTheDocument()
    );
});

it.each(['error', 'success'] as Status[])(
    'renders the toast with the %s status',
    async (status) => {
        const { user } = setup({ status: status as Status });

        await user.click(
            screen.getByRole('button', { name: toastTriggerText })
        );

        expect(screen.getByTitle(status)).toBeInTheDocument();
    }
);

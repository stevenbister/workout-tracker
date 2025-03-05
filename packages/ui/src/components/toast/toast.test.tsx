import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast as sonnerToast } from 'sonner';

import type { Status } from '../../types';
import type { ToastProps } from './toast';
import { Toaster, toast } from './toast';

vi.mock('sonner', async (importOriginal) => ({
    ...(await importOriginal<typeof import('sonner')>()),
    toast: {
        ...(await importOriginal<typeof import('sonner')>()).toast,
        dismiss: vi.fn(),
    },
}));

const toastTriggerText = 'Show toast';

const defaultProps: ToastProps = {
    id: 1,
    title: 'Toast',
    description: 'This is a toast',
};

const setup = (props?: Partial<ToastProps>) => ({
    user: userEvent.setup(),
    ...render(
        <>
            <Toaster />
            <button onClick={() => toast.render({ ...defaultProps, ...props })}>
                {toastTriggerText}
            </button>
        </>
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

    expect(sonnerToast.dismiss).toHaveBeenCalledTimes(1);
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

import userEvent from '@testing-library/user-event';

import { render, screen } from '../../tests/utils';
import type { DrawerProps } from './drawer';
import { Drawer } from './drawer';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

const mockTitle = 'Title';
const mockTriggerLabel = 'Trigger';
const mockChildren = 'Children';

const defaultProps: DrawerProps = {
    title: mockTitle,
    trigger: <button>{mockTriggerLabel}</button>,
    children: <div>{mockChildren}</div>,
};

const setup = (props?: Partial<DrawerProps>) => ({
    user: userEvent.setup(),
    //@ts-expect-error -- only testing expecting some props to be missing
    ...render(<Drawer {...defaultProps} {...props} />),
});

it('renders the trigger', () => {
    setup();

    expect(
        screen.getByRole('button', {
            name: mockTriggerLabel,
        })
    ).toBeInTheDocument();
});

it('renders the drawer content when the drawer is open', async () => {
    const { user } = setup();

    await user.click(
        screen.getByRole('button', {
            name: mockTriggerLabel,
        })
    );

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText(mockChildren)).toBeInTheDocument();
});

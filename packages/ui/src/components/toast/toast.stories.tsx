import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/button';
import { Toast, Toaster, toast } from './toast';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Toast> = {
    title: 'Toast',
    component: Toast,
    decorators: [
        (Story) => (
            <>
                <Toaster />
                <Story />
            </>
        ),
    ],
    render: (args) => (
        <Button onClick={() => toast.render(args)}>Show Toast</Button>
    ),
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {},
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {},
};
export default meta;

type Story = StoryObj<typeof Toast>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        title: 'Headless Toast',
        description:
            'You have full control of styles and jsx, while still having the animations.',
        button: {
            onClick: () => void 0,
        },
    },
};

export const Success: Story = {
    args: {
        title: 'Success',
        description: '',
        status: 'success',
        button: undefined,
    },
};

export const Error: Story = {
    args: {
        title: 'Error',
        description: 'Oops, please try again',
        status: 'error',
    },
};

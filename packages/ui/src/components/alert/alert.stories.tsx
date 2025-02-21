import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Alert } from './alert';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Alert> = {
    title: 'Alert',
    component: Alert,
    render: (args) => <Alert {...args} />,
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

type Story = StoryObj<typeof Alert>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        heading: 'This is some helpful info',
        description: 'This is some more helpful info',
        onClose: fn(),
        status: 'info',
    },
};

export const Success: Story = {
    args: {
        heading: 'Success!',
        onClose: fn(),
        status: 'success',
    },
};

export const Error: Story = {
    args: {
        heading: 'Oops something went wrong',
        description: 'Please try again later',
        onClose: fn(),
        status: 'error',
    },
};

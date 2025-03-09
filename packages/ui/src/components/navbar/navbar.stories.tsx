import type { Meta, StoryObj } from '@storybook/react';

import { Navbar } from './navbar';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Navbar> = {
    title: 'Navbar',
    component: Navbar,
    render: (args) => <Navbar {...args} />,
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

type Story = StoryObj<typeof Navbar>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        items: [
            {
                name: 'Home',
                route: '/',
                icon: 'home',
            },
            {
                name: 'Workouts',
                route: '/workouts',
                icon: 'barbell',
            },
            {
                name: 'Profile',
                route: '/profile',
                icon: 'user',
            },
        ],
    },
};

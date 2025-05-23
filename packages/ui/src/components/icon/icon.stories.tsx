import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from './icon';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Icon> = {
    title: 'Icon',
    component: Icon,
    render: (args) => <Icon {...args} />,
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

type Story = StoryObj<typeof Icon>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        spriteId: 'success',
    },
};

export const CustomColor: Story = {
    args: {
        spriteId: 'close',
        style: {
            color: 'transparent',
            stroke: 'var(--c-grey-500)',
        },
    },
};

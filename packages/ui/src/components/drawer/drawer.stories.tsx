import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/button';
import { Drawer } from './drawer';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Drawer> = {
    title: 'Drawer',
    component: Drawer,
    render: (args) => (
        <>
            <Drawer {...args} trigger={<Button>Open drawer</Button>}>
                <div>Drawer content</div>
            </Drawer>
        </>
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

type Story = StoryObj<typeof Drawer>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        title: 'Title',
    },
};

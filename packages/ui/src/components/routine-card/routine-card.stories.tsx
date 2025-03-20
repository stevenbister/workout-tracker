import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { RoutineCard } from './routine-card';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof RoutineCard> = {
    title: 'RoutineCard',
    component: RoutineCard,
    render: (args) => <RoutineCard {...args} />,
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

type Story = StoryObj<typeof RoutineCard>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        heading: 'Upper A',
        exerciseList: [
            'Bench Press (Barbell)',
            'Seated Row (Machine)',
            'Incline Bench Press (Dumbbell)',
            'Chin up',
            'Triceps Pushdown (Cable)',
            'Bicep Curl (Dumbbell)',
        ],
        button: {
            label: 'Start routine',
            onClick: fn(),
        },
        link: {
            to: '/',
        },
    },
};

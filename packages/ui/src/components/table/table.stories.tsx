import type { Meta, StoryObj } from '@storybook/react';

import { capitalise } from '../../utils/capitalise';
import { mockData } from './mock';
import { Table } from './table';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Table> = {
    title: 'Table',
    component: Table,
    render: (args) => (
        <Table {...args}>
            <Table.Thead>
                <Table.Tr>
                    {Object.keys(mockData[0]!).map((key) => (
                        <Table.Th scope="col" key={key}>
                            {capitalise(key)}
                        </Table.Th>
                    ))}
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {mockData.map(({ set, previous, kg, reps }) => (
                    <Table.Tr key={set}>
                        <Table.Td>{set}</Table.Td>
                        <Table.Td>{previous}</Table.Td>
                        <Table.Td>{kg}</Table.Td>
                        <Table.Td>{reps}</Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
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

type Story = StoryObj<typeof Table>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        caption: 'Bench press reps and weight',
    },
};

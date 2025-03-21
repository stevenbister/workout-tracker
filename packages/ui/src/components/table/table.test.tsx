import { render, screen } from '../../tests/utils';
import { mockData } from './mock';
import { Table, type TableProps } from './table';

const mockCaption = 'Bench press reps and weight';
const headerCells = Object.keys(mockData[0]!);

const setup = (props?: Partial<TableProps>) =>
    render(
        <Table caption={props?.caption ?? mockCaption} {...props}>
            <Table.Thead>
                <Table.Tr>
                    {headerCells.map((key) => (
                        <Table.Th scope="col" key={key}>
                            {key}
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
    );

beforeEach(() => vi.resetAllMocks());

it('renders the component with the correct roles', () => {
    setup();

    expect(
        screen.getByRole('region', {
            name: mockCaption,
        })
    ).toBeInTheDocument();
    expect(screen.getByRole('table')).toHaveAccessibleName(mockCaption);
    expect(screen.getByRole('caption')).toBeInTheDocument();

    expect(screen.getAllByRole('rowgroup')).toHaveLength(2);
    expect(screen.getAllByRole('row')).toHaveLength(mockData.length + 1);

    expect(screen.getAllByRole('columnheader')).toHaveLength(
        mockData.length + 1
    );

    expect(screen.getAllByRole('cell')).toHaveLength(
        mockData.length * headerCells.length
    );
});

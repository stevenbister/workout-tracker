import { Link } from '@tanstack/react-router';

import { IconText } from '@repo/ui/components/icon-text';
import { Table } from '@repo/ui/components/table';
import { getTemporalUnit } from '@repo/ui/utils/get-temporal-unit';

import { ROUTES } from '@/constants';
import type { RoutineExercise } from '@/types/api';

export interface ExerciseTableProps {
    exercise: RoutineExercise;
}

export const ExerciseTable = ({ exercise }: ExerciseTableProps) => {
    const HEADINGS = ['Set', 'KG', 'Reps'] as const;
    const { id, name, restTime, sets } = exercise;

    const { seconds, minutes } = getTemporalUnit(restTime);

    return (
        <article className="stack">
            <h2 className="fs-1 fw-400">
                <Link
                    to={`${ROUTES.EXERCISES}/$exerciseId`}
                    params={{ exerciseId: String(id) }}
                    preload="viewport"
                    className="c-grey-600 td-none"
                >
                    {name}
                </Link>
            </h2>

            <IconText spriteId="stopwatch" text={`${minutes}min ${seconds}s`} />

            {sets && sets.length > 0 ? (
                <Table caption={`${name} sets`}>
                    <Table.Thead>
                        <Table.Tr>
                            {HEADINGS.map((heading) => (
                                <Table.Th scope="col" key={heading}>
                                    {heading}
                                </Table.Th>
                            ))}
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                        {sets.map(
                            ({ id, setNumber, weight, maxReps, minReps }) => (
                                <Table.Tr key={id}>
                                    <Table.Td>{setNumber}</Table.Td>
                                    <Table.Td>{weight}</Table.Td>
                                    <Table.Td>
                                        {minReps} - {maxReps}
                                    </Table.Td>
                                </Table.Tr>
                            )
                        )}
                    </Table.Tbody>
                </Table>
            ) : null}
        </article>
    );
};

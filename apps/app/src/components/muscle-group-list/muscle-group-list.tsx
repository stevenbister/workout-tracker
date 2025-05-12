import { Fragment } from 'react';

export interface MuscleGroupListProps {
    muscleGroups: string[];
    title: string;
}

export const MuscleGroupList = ({
    muscleGroups,
    title,
}: MuscleGroupListProps) => (
    <div className="d-flex">
        <dt className="mr-2xs">{title}</dt>
        <dd>
            {muscleGroups.map((muscleGroup, i) => (
                <Fragment key={muscleGroup}>
                    {muscleGroup}
                    {i < muscleGroups.length - 1 ? ', ' : ''}
                </Fragment>
            ))}
        </dd>
    </div>
);

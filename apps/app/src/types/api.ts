import type { paths } from './schema';

export type Exercise =
    paths['/api/v1/exercises']['get']['responses']['200']['content']['application/json'][number];

export type Routines =
    paths['/api/v1/routines']['get']['responses']['200']['content']['application/json'];

export type Routine =
    paths['/api/v1/routines/:id']['get']['responses']['200']['content']['application/json'];

export type RoutineGroups =
    paths['/api/v1/routines/groups']['get']['responses']['200']['content']['application/json'];

export type RoutineExercise = Routine['exercises'][number];

import { ROUTINES, ROUTINE_GROUPS } from '@repo/core/constants/paths';

import type { Routine, RoutineGroups } from '@/types/api';

import { client } from './client';

export const getRoutineGroups = async () =>
    await client.get<RoutineGroups>(ROUTINE_GROUPS).json();

export const getRoutine = async (id: string) =>
    await client.get<Routine>(`${ROUTINES}/${id}`).json();

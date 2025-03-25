import { ROUTINE_GROUPS } from '@repo/core/constants/paths';

import type { RoutineGroups } from '@/types/api';

import { client } from './client';

export const getRoutineGroups = async () =>
    await client.get<RoutineGroups>(ROUTINE_GROUPS).json();

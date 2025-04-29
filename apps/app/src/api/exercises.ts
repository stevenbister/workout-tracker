import { EXERCISES } from '@repo/core/constants/paths';

import type { Exercise } from '@/types/api';

import { client } from './client';

export const getExercise = async (id: string) =>
    await client.get<Exercise>(`${EXERCISES}/${id}`).json();

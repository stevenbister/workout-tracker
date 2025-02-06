import { API_PREFIX } from './misc';

export const GET_ALL_EXERCISES = `${API_PREFIX}/exercises` as const;
export const GET_EXERCISE_BY_ID = `${API_PREFIX}/exercises/{id}` as const;

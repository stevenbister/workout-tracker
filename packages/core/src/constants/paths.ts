import { API_PREFIX } from './misc';

export const GET_ALL_EXERCISES = `${API_PREFIX}/exercises` as const;
export const GET_EXERCISE_BY_ID = `${API_PREFIX}/exercises/:id` as const;

export const GET_ALL_MUSCLE_GROUPS = `${API_PREFIX}/muscle-groups` as const;

export const GET_ALL_EQUIPMENT = `${API_PREFIX}/equipment` as const;

export const GET_ALL_ROUTINES = `${API_PREFIX}/routines` as const;
export const GET_ROUTINE_BY_ID = `${API_PREFIX}/routines/:id` as const;

export const AUTH = `${API_PREFIX}/auth` as const;

import { API_PREFIX } from './misc';

export const EXERCISES = `${API_PREFIX}/exercises` as const;

export const MUSCLE_GROUPS = `${API_PREFIX}/muscle-groups` as const;

export const EQUIPMENT = `${API_PREFIX}/equipment` as const;

export const ROUTINES = `${API_PREFIX}/routines` as const;
export const CREATE_ROUTINE = `${ROUTINES}/create` as const;
export const ROUTINE_GROUPS = `${ROUTINES}/groups` as const;

export const AUTH = `${API_PREFIX}/auth` as const;

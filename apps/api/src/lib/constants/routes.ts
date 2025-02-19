import { ALL_EXERCISES, ALL_ROUTINES } from '@repo/core/constants/paths';

export const USER_AUTHENTICATED_ROUTES = [
    `${ALL_EXERCISES}/*`,
    `${ALL_ROUTINES}/*`,
] as const;

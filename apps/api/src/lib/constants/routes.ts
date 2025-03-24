import { EXERCISES, ROUTINES } from '@repo/core/constants/paths';

export const USER_AUTHENTICATED_ROUTES = [
    `${EXERCISES}/*`,
    `${ROUTINES}/*`,
] as const;

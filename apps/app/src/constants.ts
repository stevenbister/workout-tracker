export const ROUTES = {
    ROOT: '/',
    LOGIN: '/login',
    LOGOUT: '/logout',
    EXERCISES: '/exercises',
    WORKOUTS: '/workouts',
    ROUTINES: '/routines',
    PROFILE: '/profile',
} as const;

export type Routes = typeof ROUTES;

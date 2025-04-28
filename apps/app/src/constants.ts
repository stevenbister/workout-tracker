export const ROUTES = {
    ROOT: '/',
    LOGIN: '/login',
    LOGOUT: '/logout',
    WORKOUTS: '/workouts',
    ROUTINES: '/routines',
    PROFILE: '/profile',
} as const;

export type Routes = typeof ROUTES;

export const ROUTES = {
    ROOT: '/',
    LOGIN: '/login',
    LOGOUT: '/logout',
    WORKOUTS: '/workouts',
    PROFILE: '/profile',
} as const;

export type Routes = typeof ROUTES;

export const ROUTES = {
    ROOT: '/',
    LOGIN: '/login',
    LOGOUT: '/logout',
} as const;

export type Routes = typeof ROUTES;

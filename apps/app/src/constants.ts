export const ROUTES = {
    ROOT: '/',
    LOGIN: '/login',
} as const;

export type Routes = typeof ROUTES;

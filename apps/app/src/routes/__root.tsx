import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null
        : lazy(() =>
              import('@tanstack/router-devtools').then((res) => ({
                  default: res.TanStackRouterDevtools,
              }))
          );

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                title: 'Workout Tracker',
            },
        ],
    }),
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <HeadContent />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    );
}

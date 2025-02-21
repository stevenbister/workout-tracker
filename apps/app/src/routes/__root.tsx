import { Outlet, createRootRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null // Render nothing in production
        : lazy(() =>
              // Lazy load in development
              import('@tanstack/router-devtools').then((res) => ({
                  default: res.TanStackRouterDevtools,
              }))
          );

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    );
}

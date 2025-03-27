/* eslint-disable react-refresh/only-export-components */
import {
    createMemoryHistory,
    createRootRoute,
    createRoute,
    createRouter,
    useRouterState,
} from '@tanstack/react-router';

const NotFoundComponent = () => {
    const state = useRouterState();

    return (
        <div>
            <i>Warning:</i> Simulated route not found for path{' '}
            <code>{state.location.href}</code>
        </div>
    );
};

/**
 * As we do not need any actual actions (ie. navigation somewhere else)
 * Then this should suffice for our needs
 */
const storyPath = '/__story__';
const storyRoute = createRoute({
    path: storyPath,
    getParentRoute: () => rootRoute,
});

const rootRoute = createRootRoute({
    notFoundComponent: NotFoundComponent,
});
rootRoute.addChildren([storyRoute]);

export const router = createRouter({
    history: createMemoryHistory({ initialEntries: [storyPath] }),
    routeTree: rootRoute,
});

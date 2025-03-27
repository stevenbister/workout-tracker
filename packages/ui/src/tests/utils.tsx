/* eslint-disable no-restricted-imports, react-refresh/only-export-components */
import { RouterProvider } from '@tanstack/react-router';
import {
    type RenderOptions,
    type RenderResult,
    render,
} from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

import { SpritesheetProvider } from '../components/icon/icon';
import { Toaster } from '../components/toast/toast';
import { router as defaultRouter } from '../mocks/mock-router';

type WrapperProps = {
    children: ReactNode;
    router?: typeof defaultRouter;
};

const Wrapper = ({ children }: WrapperProps) => (
    <SpritesheetProvider>
        {children}
        <Toaster />
    </SpritesheetProvider>
);

const WrapperWithRoutes = ({
    children,
    router = defaultRouter,
}: WrapperProps) => (
    <Wrapper>
        <RouterProvider router={router} defaultComponent={() => children} />
    </Wrapper>
);

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
): RenderResult => render(ui, { wrapper: Wrapper, ...options });

const customRenderWithRouter = (
    ui: ReactElement,
    router?: typeof defaultRouter,
    options?: Omit<RenderOptions, 'wrapper'>
): RenderResult => {
    return render(ui, {
        wrapper: ({ children }) => (
            <WrapperWithRoutes router={router}>{children}</WrapperWithRoutes>
        ),
        ...options,
    });
};

export * from '@testing-library/react';
export { customRender as render, customRenderWithRouter as renderWithRouter };

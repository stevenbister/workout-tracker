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
import { router } from '../mocks/mock-router';

type WrapperProps = {
    children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => (
    <SpritesheetProvider>
        {children}
        <Toaster />
    </SpritesheetProvider>
);

const WrapperWithRoutes = ({ children }: WrapperProps) => (
    <Wrapper>
        <RouterProvider
            router={router as never}
            defaultComponent={() => children}
        />
    </Wrapper>
);

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
): RenderResult => render(ui, { wrapper: Wrapper, ...options });

const customRenderWithRouter = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
): RenderResult => {
    return render(ui, {
        wrapper: WrapperWithRoutes,
        ...options,
    });
};

export * from '@testing-library/react';
export { customRender as render, customRenderWithRouter as renderWithRouter };

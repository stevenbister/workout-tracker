/* eslint-disable no-restricted-imports, react-refresh/only-export-components */
import {
    type RenderOptions,
    type RenderResult,
    render,
} from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

import { Toaster } from '../components/toast/toast';

const Wrapper = ({ children }: { children: ReactNode }) => (
    <>
        {children}
        <Toaster />
    </>
);

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };

import type { Meta, StoryObj } from '@storybook/react';
import React, { type ReactNode } from 'react';

type DocsCanvasProps = {
    children?: ReactNode;
};

function DocsCanvas({ children }: Readonly<DocsCanvasProps>) {
    return <>{children}</>;
}

const meta: Meta<typeof DocsCanvas> = {
    title: 'Tokens/Typography',
    component: DocsCanvas,
};

export default meta;

const Wrapper = ({ children }: Readonly<{ children: ReactNode }>) => (
    <div>{children}</div>
);

export const Typography: StoryObj<typeof DocsCanvas> = {
    args: {
        children: (
            <Wrapper>
                <p className="fs--2">2X Small</p>
                <p className="fs--1">X Small</p>
                <p className="fs-0">Small</p>
                <p className="fs-1">Medium</p>
                <p className="fs-2">Large</p>
                <p className="fs-3">X Large</p>
                <p className="fs-4">2X Large</p>
                <p className="fs-5">3X Large</p>
            </Wrapper>
        ),
    },
};

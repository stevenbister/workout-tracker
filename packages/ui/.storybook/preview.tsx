/* eslint-disable react-refresh/only-export-components */
import type { Preview } from '@storybook/react';
import { RouterProvider } from '@tanstack/react-router';
import { type ReactNode } from 'react';

import { SpritesheetProvider } from '../src/components/icon/icon';
import { router } from '../src/mocks/mock-router';
import '../src/styles.css';

const SbComponent = ({ Story }: { Story: () => ReactNode }) => (
    <SpritesheetProvider spriteSheetPath="/spritesheet.svg">
        <Story />
    </SpritesheetProvider>
);

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story) => (
            <RouterProvider
                router={router}
                defaultComponent={() => <SbComponent Story={Story} />}
            />
        ),
    ],
};

export default preview;

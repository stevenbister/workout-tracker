import type { Preview } from '@storybook/react';
import React from 'react';

import { SpritesheetProvider } from '../src/components/icon/icon';
import '../src/styles/main.scss';

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
            <SpritesheetProvider spriteSheetPath="/spritesheet.svg">
                <Story />
            </SpritesheetProvider>
        ),
    ],
};

export default preview;

import { apiReference } from '@scalar/hono-api-reference';

import type { AppOpenAPI } from '@/types';

import packageJSON from '../../package.json';

export default function configureOpenAPI(app: AppOpenAPI) {
    app.doc('/doc', {
        openapi: '3.0.0',
        info: {
            version: packageJSON.version,
            title: 'Workout Tracker API',
        },
    });

    app.get(
        '/reference',
        apiReference({
            theme: 'kepler',
            layout: 'modern',
            defaultHttpClient: {
                targetKey: 'javascript',
                clientKey: 'fetch',
            },
            spec: {
                url: '/doc',
            },
        })
    );
}

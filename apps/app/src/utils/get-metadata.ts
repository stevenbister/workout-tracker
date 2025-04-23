import type { DetailedHTMLProps, MetaHTMLAttributes } from 'react';

import meta from '@/content/metadata.json';

type MetaRoutes = keyof typeof meta.routes;

type Metadata =
    | (
          | DetailedHTMLProps<
                MetaHTMLAttributes<HTMLMetaElement>,
                HTMLMetaElement
            >
          | undefined
      )[]
    | undefined;

export const getMetadata = (route?: MetaRoutes): Metadata => {
    const defaultMetadata = [
        {
            title: meta.appName,
        },
    ];

    if (!route) return defaultMetadata;

    if (!meta.routes[route]) {
        console.warn(`"${route}" does not match key in metadata.json`);

        return defaultMetadata;
    }

    const metadata = meta.routes[route].map((entry) => {
        if ('title' in entry) {
            return {
                ...entry,
                title: `${entry.title} ${meta.separator} ${meta.appName}`,
            };
        }
        return entry;
    });

    return metadata;
};

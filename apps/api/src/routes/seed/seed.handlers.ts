import { seed } from '@/db/seed/index';
import { STATUS } from '@/lib/constants/http-status-codes';
import type { AppRouteHandler } from '@/types';

import type { SeedRoute } from './seed.routes';

export const seedRoute: AppRouteHandler<SeedRoute> = async (c) => {
    if (process.env.NODE_ENV === 'production')
        return c.json(
            { message: STATUS.NOT_FOUND.MESSAGE },
            STATUS.NOT_FOUND.CODE
        );

    // const CHUNK_SIZE = 10;

    // function chunkArray<T>(array: T[], size: number): T[][] {
    //     const chunks: T[][] = [];
    //     for (let i = 0; i < array.length; i += size) {
    //         chunks.push(array.slice(i, i + size));
    //     }
    //     return chunks;
    // }

    // async function processInChunks<T>(
    //     items: T[],
    //     chunkSize: number,
    //     processFn: (chunk: T[]) => Promise<void>
    // ) {
    //     const chunks = chunkArray(items, chunkSize);
    //     for (const chunk of chunks) {
    //         await processFn(chunk);
    //     }
    // }
    //

    const db = c.get('db');

    await seed(db);

    return c.json({ message: 'Success' }, STATUS.OK.CODE);
};

import ky from 'ky';

// TODO: Error handling
// - Display toast on post errors (can we do this globally across requests?)
export const client = ky.create({
    prefixUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
    hooks: {
        beforeRequest: [
            (request) => {
                request.headers.set('x-api-key', import.meta.env.VITE_API_KEY);
            },
        ],
    },
});

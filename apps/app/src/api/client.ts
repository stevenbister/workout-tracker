import ky from 'ky';

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
